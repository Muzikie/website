'use client';

import React, {createContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {createWallet} from '@/app/actions/createWallet';
import {SupportedBlockchains, SupportedWallets} from '@/app/config/types';
import {NETWORK, CHAIN_ID} from '@/app/config/network';
import {EthereumProvider} from './types';

type WalletContextType = {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<string>;
};

export const WalletContext = createContext<WalletContextType>({
  address: null,
  provider: null,
  connect: async () => {},
  disconnect: async () => {},
  getBalance: async () => '',
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const getBalance = async (): Promise<string> => {
    if (!provider || !address) return '0';
    const balance = await provider.getBalance(address);
    console.log('Provider balance', balance);
    return ethers.formatEther(balance);
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
    <WalletContext.Provider value={{ address, provider, connect, disconnect, getBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

