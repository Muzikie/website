'use client';

import React, {createContext, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {createWallet} from '@/app/actions/createWallet';
import { SupportedBlockchains, SupportedWallets } from '@/app/config/types';

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

  const connect = async () => {
    if (!(window as any).ethereum) return alert('Please install MetaMask');
    const _provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await _provider.send('eth_requestAccounts', []);
    setAddress(accounts[0]);
    setProvider(_provider);

    await createWallet({
      address: accounts[0],
      public_key: accounts[0],
      wallet_type: SupportedWallets.META_MASK,
      blockchain: SupportedBlockchains.ETHEREUM,
    })
  };

  const disconnect = async () => {};

  useEffect(() => {
    const check = async () => {
      if (!(window as any).ethereum) return;
      const _provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await _provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(_provider);
      }
    };
    check();
  }, []);

  return (
    <WalletContext.Provider value={{ address, provider, connect, disconnect, getBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

