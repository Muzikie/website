'use client';

import React, {FC, useEffect, useState} from 'react';
import NextImage from 'next/image';

import metamask from '@/public/images/metamask.png';
import {ConnectWallet} from '@/app/components/Wallet/ConnectWallet';
import {useWallet} from '@/app/components/Wallet/useWallet';
import {showBalance} from '@/app/utils/formatters';
import {BoxTitle} from '../BoxTitle';
import {BalancesAttrs} from '../types';

const NotConnected = () => (
  <div className="grow flex flex-col justify-between py-12">
    <h5 className="text-neutralPure text-xl font-light leading-7">
      Muzikie works with MetaMask over the Lisk network.
    </h5>
    <ConnectWallet />
  </div>
);

const Balances: FC<BalancesAttrs> = ({balances}) => (
  <div className="grow flex flex-col justify-between py-12 items-start">
    <span className="font-martian font-light text-lg text-neutralPure leading-7">Balances on Lisk network</span>
    <div className="flex flex-row flex-nowrap gap-2 items-baseline bg-neutralSeeThrough p-4 border-2 border-neutralStrong rounded-[20px]">
      <span className="font-martian font-semi-semibold text-4xl text-neutralStrong leading-7">
        {showBalance(balances[1])}
      </span>
      <small>USDC.e</small>
    </div>
    <div className="flex flex-row flex-nowrap gap-2 items-baseline bg-neutralSeeThrough p-2 border-2 border-neutralStrong rounded-[12px]">
      <span className="font-martian font-light text-lg text-neutralStrong leading-7">
        {showBalance(balances[0])}
      </span>
      <small>ETH</small>
    </div>
  </div>
);

export const Wallet = () => {
  const {address, getBalance} = useWallet();
  const [balances, setBalances] = useState<string[]>(['0', '0']);

  const updateBalance = async () => {
    const value = await getBalance();
    setBalances(value);
  };

  useEffect(() => {
    updateBalance();
  }, [address]);

  return (
    <section className="h-[365px] lg:pr-6 border-box">
      <div className="w-full h-full border-box p-6 bg-lushLight rounded-[32px] flex flex-col relative">
        <BoxTitle>Wallet</BoxTitle>
        {
          address ? <Balances balances={balances} /> : <NotConnected />
        }
        <NextImage
          src={metamask}
          alt="metamask wallet icon"
          className="absolute -right-6 -bottom-6 w-[190px]"
        />
      </div>
    </section>
  );
};
