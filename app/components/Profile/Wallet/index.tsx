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

const Balances: FC<BalancesAttrs> = ({ balances, disconnect }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="grow flex flex-col justify-between items-start">
      <div className="w-full flex flex-row justify-end -mt-8">
        <div className="relative">
          <span
            className="font-martian text-neutralPure text-xl p-2 cursor-pointer"
            onClick={() => setShowTooltip(prev => !prev)}
          >
            ?
          </span>

          {showTooltip && (
            <div className="absolute right-0 mt-2 w-80 p-6 border border-neutralBorder bg-white rounded-[12px] text-sm text-neutralText shadow-lg transition-all duration-200 z-10">
              <span className="block mb-2">
                Muzikie uses USDC on the Lisk network to fund campaigns. You’ll need a small amount of ETH on Lisk to cover network fees.
              </span>
              <span className="block mb-2">
                Here’s the USDC contract address:{' '}
                <a
                  href="https://sepolia-blockscout.lisk.com/address/0x3ba742FD7502a6395D234e024A64c78705496dfE"
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0x3ba742...496dfE
                </a>
                .
              </span>
              <span className="block">
                If you need tokens,{' '}
                <a
                  href="https://docs.lisk.com/user/connecting-to-a-wallet"
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this page
                </a>{' '}
                will help you top up your account.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-neutralSeeThrough p-4 border-2 border-neutralStrong rounded-[20px]">
        <div className="flex flex-row flex-nowrap gap-2 items-baseline">
          <span className="font-martian text-neutralStrong text-3xl uppercase">
            {showBalance((parseFloat(balances[1] / 1000)).toString())}
          </span>
          <small className="font-martian text-neutralStrong uppercase text-xs">USDC.e</small>
        </div>

        <div className="flex flex-row flex-nowrap gap-2 items-baseline pt-2">
          <span className="font-martian text-neutralStrong uppercase text-xs">
            {showBalance(balances[0])}
          </span>
          <small className="font-martian text-neutralStrong uppercase text-xs">ETH</small>
        </div>
      </div>

      <button className="font-martian text-neutralPure uppercase text-xs" onClick={disconnect}>
        Disconnect wallet
      </button>
    </div>
  );
};

export const Wallet = () => {
  const {address, getBalance, disconnect} = useWallet();
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
          address ? <Balances balances={balances} disconnect={disconnect} /> : <NotConnected />
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
