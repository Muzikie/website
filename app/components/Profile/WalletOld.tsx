'use client'

import React, {FC, useEffect, useRef, useState} from 'react';

import {Timeout} from '@/app/config/types';
import {View, H1, H2, H3, Span, TouchableHighlight} from '@/app/components/Polyfills';
import {Icon, Input} from '@/app/components/Elements';

import {ConnectWallet} from '@/app/components/Wallet/ConnectWallet';
import {updateProfile} from '@/app/actions/updateProfile';
import {WalletProps} from './types';
import {useWallet} from '../Wallet/useWallet';
import {showBalance} from '@/app/utils/formatters';
import {SupportedTokens} from '@/app/config/types';

const Carrot = () => {
  const presets = {};

  return (
    <svg width="98" height="44" viewBox="0 0 49 22" fill={presets.theme === 'dark' ? '#111111' : '#CCCCCC'} xmlns="http://www.w3.org/2000/svg" className="relative mx-auto top-[-44px] ">
      <path d="M49 22C38 22 38.031 22 24.5 22C10.969 22 11 22 0 22C24.5 22 10.969 0 24.5 0C38.031 0 26.2093 22 49 22Z" />
    </svg>
  );
}

const Wallet: FC<WalletProps> = ({data}) => {
  const {getBalance, address} = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [balances, setBalances] = useState<string[]>(['0', '0']);
  const [formData, setFormData] = useState({
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
  });
  const timer = useRef<Timeout>();
  const presets = {};

  const updateBalance = async () => {
    const value = await getBalance();
    setBalances(value);
  };

  const save = async () => {
    const result = await updateProfile(formData, data.profileId);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const onInputChange = (fieldName: string) => (value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  const fullName = [formData?.first_name, formData?.last_name]
    .filter(item => !!item)
    .join(' ') || 'Set your name';

  useEffect(() => {
    updateBalance();
  }, [address]);

  return (
    <View className="w-full bg-neutralPale rounded-3xl relative mt-14 pb-6">
      <Carrot />
      <View>
        {!isEditing ? (
          <View className="w-full flex flex-row justify-center items-center mb-6">
            <H2 className="text-primaryStrong font-light">{fullName}</H2>
            <TouchableHighlight
              onPress={() => setIsEditing(true)}
              className="w-[44px] h-[44px] cursor-pointer"
            >
              <Icon
                name="feather"
                size={28}
                color={presets.theme === 'dark' ? '#825E87' : '#453248'} 
              />
            </TouchableHighlight>
          </View>
        ) : null}
        {
          isEditing && (
            <View className="w-full flex flex-row justify-center items-end mb-6 px-6 gap-2">
              <Input
                placeholder="First name"
                onChange={onInputChange}
                value={formData.first_name}
                name="first_name"
              />
              <Input
                placeholder="Last name"
                onChange={onInputChange}
                value={formData.last_name}
                name="last_name"
              />
              <TouchableHighlight
                onPress={save}
                className="w-[44px] h-[44px] mb-4 cursor-pointer"
              >
                <Icon
                  name="check"
                  size={28}
                  color={presets.theme === 'dark' ? '#825E87' : '#453248'} 
                />
              </TouchableHighlight>
            </View>
          )
        }
        <View className="w-full text-center mb-6">
          <Span className="text-neutralSteady font-light">Balances</Span>
          <H1 className="text-primaryStrong">
            {showBalance(balances[1], SupportedTokens.USDC)}
          </H1>
          <H3 className="text-primaryStrong">
            {showBalance(balances[0], SupportedTokens.ETH)}
          </H3>
        </View>
        <View className="w-full text-center">
          <Span className="text-neutralSteady font-light">{`${
            process.env.NEXT_PUBLIC_NETWORK_NAME || ''
          } Wallet Address`}</Span>
          <ConnectWallet />
        </View>
      </View>
    </View>
  );
};

export default Wallet;
