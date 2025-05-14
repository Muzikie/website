'use client';

import React, {useRef, useState} from 'react';

import {Timeout} from '@/app/config/types';
import {truncateAddress} from '@/app/utils/formatters';
import {H4, TouchableHighlight} from '@/app/components/Polyfills';
import {useWallet} from './useWallet';

export default function ConnectWalletButton() {
  const { address, connect } = useWallet();
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
    
    <div>
      {address ? (
        <TouchableHighlight onPress={onCopy} className="w-full">
          <H4
            className="font-light">
            {copied ? 'Copied to clipboard' : `Connected: ${truncateAddress(address)}`}
          </H4>
        </TouchableHighlight>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}