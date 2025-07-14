'use server'

import React from 'react';

import {View} from '@/app/components/Polyfills';
import {getUserAccount} from '@/app/actions/getUserAccount';
import Avatar from './Avatar';
import Wallet from './WalletOld';

const Basics = async () => {
  const account = await getUserAccount();

  return (
    <View className="w-full p-6">
      <Avatar data = {account.avatar?.formats ?? {}} profileId={account.profileId} />
      <Wallet data={account} />
    </View>
  );
};

export default Basics;
