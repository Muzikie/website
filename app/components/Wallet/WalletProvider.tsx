'use client';

import {ethers, toUtf8String, parseUnits} from 'ethers';

import React, {createContext, useEffect, useState} from 'react';
import {createWallet} from '@/app/actions/createWallet';
import {SupportedBlockchains, SupportedWallets} from '@/app/config/types';
import {NETWORK, CHAIN_ID} from '@/app/config/network';
import USDC_ABI from '@/app/config/usdcAbi.json';
import MELODYNE_ABI from '@/app/config/melodyneAbi.json';
import {EthereumProvider, OnChainError, WalletContextType} from './types';

const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS || '';
if (!USDC_ADDRESS) {
  throw new Error('Missing env variable NEXT_PUBLIC_USDC_ADDRESS');
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
if (!CONTRACT_ADDRESS) {
  throw new Error('Missing env variable CONTRACT_ADDRESS');
}

const iface = new ethers.Interface(MELODYNE_ABI);

function extractRevertReason(error: OnChainError): string | null {
  if (error.reason) return error.reason;

  if (error.error?.data?.message) return error.error.data.message;
  if (typeof error.data === 'string') {
    try {
      const reason = toUtf8String('0x' + error.data.slice(138));
      return reason;
    } catch {}
  }

  if (error.data?.message) return error.data.message;
  return null;
}


export const WalletContext = createContext<WalletContextType>({
  address: null,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
  getBalance: async () => ['0', '0'],
  sendTransaction: async () => {throw new Error('sendTransaction is not implemented yet.')},
  ensureAllowance: async () => {throw new Error('ensureAllowance is not implemented yet.')},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const getBalance = async (): Promise<string[]> => {
    if (!provider || !address) return ['0', '0'];

    const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider);
    const [rawBalance, decimals] = await Promise.all([
      usdc.balanceOf(address),
      usdc.decimals(),
    ]);

    const rawEth = await provider.getBalance(address);

    const usdcBalance = ethers.formatUnits(rawBalance, decimals);
    const ethBalance =  ethers.formatEther(rawEth);
    return [ethBalance, usdcBalance]
  };

  const switchToLisk = async (ethereum: EthereumProvider) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added to MetaMask
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK],
        });
      } else {
        console.error('Error switching to Lisk network:', switchError);
      }
    }
  };

  const connect = async () => {
    try {
      if (!window.ethereum) return alert('Please install MetaMask');


      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      const _provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await _provider.send('eth_requestAccounts', []);

      await switchToLisk(window.ethereum);

      setAddress(accounts[0]);
      setProvider(_provider);

      await createWallet({
        address: accounts[0],
        public_key: accounts[0],
        wallet_type: SupportedWallets.META_MASK,
        blockchain: SupportedBlockchains.ETHEREUM,
      });
    } catch (err: unknown) {
      console.error('Wallet connection cancelled or failed:', err);
      setAddress(null);
      setProvider(null);
    }
  };

  const disconnect = async () => {
    setAddress(null);
    setProvider(null);
  };

  const check = async (provider: ethers.BrowserProvider) => {
    const accounts = await provider.send('eth_accounts', []);
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      setProvider(provider);
    }
  };

  const handleAccountChange = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      setAddress(accounts[0]);
    }
  };

  const handleDisconnection = () => {
    disconnect();
  };

  const ensureAllowance = async (val: number) => {
    if (!provider || !address) throw new Error('Wallet not connected');

    const signer = await provider.getSigner(address);
    const tokenContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
    const amount = parseUnits(val.toString(), 6);
    const allowance = await tokenContract.allowance(address, CONTRACT_ADDRESS);

    if (allowance < amount) {
      const approveTx = await tokenContract.approve(CONTRACT_ADDRESS, amount);
      await approveTx.wait();
    }
  };

  const sendTransaction = async (
    method: string,
    args: unknown[],
    eventNameToParse?: string,
  ): Promise<{receipt: ethers.TransactionReceipt; id?: string}> => {
    if (!provider || !address) throw new Error('Wallet not connected');

    const signer = await provider.getSigner(address);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MELODYNE_ABI, signer);

    try {
      const tx = await contract[method](...args);
      const receipt = await tx.wait();

      let id: string | undefined;
      if (eventNameToParse) {
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed?.name === eventNameToParse) {
              id = parsed.args[0]?.toString();
              break;
            }
          } catch {
            continue;
          }
        }
      }

      return {receipt, id};
    } catch (e: unknown) {
      const reason = extractRevertReason(e);
      console.error('Transaction failed:', reason || e.message);
      throw new Error(reason || 'Transaction failed');
    }
  };

  useEffect(() => {
    const ethereum: EthereumProvider = window.ethereum;
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      check(provider);
      ethereum.on('accountsChanged', handleAccountChange);
      ethereum.on('disconnect', handleDisconnection);
    }

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountChange);
      ethereum.removeListener('disconnect', handleDisconnection);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, provider, connect, disconnect, getBalance, sendTransaction, ensureAllowance }}>
      {children}
    </WalletContext.Provider>
  );
};

