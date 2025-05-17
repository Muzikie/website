'use client';

import React, {useRef, useState} from 'react';

import {Timeout} from '@/app/config/types';
import {truncateAddress} from '@/app/utils/formatters';
import {H4, TouchableHighlight} from '@/app/components/Polyfills';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button} from '@/app/components/Elements';
import {View} from '@/app/components/Polyfills';
import {useWallet} from './useWallet';

export default function ConnectWalletButton() {
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
    
    <View className="flex flex-col items-center">
      {address ? (
        <>
          <TouchableHighlight onPress={onCopy} className="w-full">
            <H4
              className="font-light">
              {copied ? 'Copied to clipboard' : truncateAddress(address)}
            </H4>
          </TouchableHighlight>
          <Button
            title="Disconnect"
            onPress={disconnect}
            theme={ButtonThemes.secondary}
            className="mt-2"
          />
        </>
      ) : (
        <Button
          title="Connect Metamask Wallet"
          onPress={connect}
          className="px-4 mt-2"
        />
      )}
    </View>
  );
}