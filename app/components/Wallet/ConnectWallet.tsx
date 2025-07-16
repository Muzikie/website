'use client';

import React, {useRef, useState} from 'react';

import {Timeout} from '@/app/config/types';
import {useWallet} from './useWallet';

export const ConnectWallet = () => {
  const { address, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const timer = useRef<Timeout>();
  const onCopy = async () => {
    setCopied(true);
    timer.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
    navigator.clipboard.writeText(address ?? '');
  };

  return (
    <button
      onClick={connect}
      className="font-martian font-light font-light text-sm leading-7 uppercase bg-amberMighty px-4 py-[5px] rounded-[8px] border border-coffeeStrong w-[180px] transition-all duration-300 ease-in-out hover:shadow-[5px_5px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
    >
      Connect wallet
    </button>
  );
}