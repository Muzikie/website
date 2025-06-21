'use client';

import React, {createContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {createWallet} from '@/app/actions/createWallet';
import {SupportedBlockchains, SupportedWallets} from '@/app/config/types';
import {NETWORK, CHAIN_ID} from '@/app/config/network';
import USDC_ABI from '@/app/config/usdcAbi.json';
import MELODYNE_ABI from '@/app/config/melodyneAbi.json';
import {EthereumProvider} from './types';

const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS || '';
if (!USDC_ADDRESS) {
  throw new Error('Missing env variable NEXT_PUBLIC_USDC_ADDRESS');
}


type WalletContextType = {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<string[]>;
  sendTransaction: (method: string, args: unknown[]) => Promise<ethers.TransactionReceipt>;
};

export const WalletContext = createContext<WalletContextType>({
  address: null,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
  getBalance: async () => ['0', '0'],
  sendTransaction: async () => {},
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

  const sendTransaction = async (
    method: string,
    args: unknown[]
  ): Promise<ethers.TransactionReceipt> => {
    if (!provider || !address) throw new Error('Wallet not connected');
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
    if (!CONTRACT_ADDRESS) {
      throw new Error('Missing env variable CONTRACT_ADDRESS');
    }

    const signer = await provider.getSigner(address);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, MELODYNE_ABI, signer);
    console.log(`method : ${method}`);
    console.log('args : ', args);
    const tx = await contract[method](...args);
    const receipt = await tx.wait();
    console.log('receipt : ', receipt);

    return receipt;
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
    <WalletContext.Provider value={{ address, provider, connect, disconnect, getBalance, sendTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

