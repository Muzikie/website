'use server'

import React from 'react';

import {View} from '@/app/components/Polyfills';
import {getUserAccount} from '@/app/actions/getUserAccount';
import {getBalances} from '@/app/actions/getBalances';
import Avatar from './Avatar';
import Wallet from './Wallet';

const Basics = async () => {
  const account = await getUserAccount();
  const balance = await getBalances(account.address);

  return (
    <View className="w-full p-6">
      <Avatar data = {account.avatar?.formats ?? {}} />
      <Wallet data={account} balance={balance} />
    </View>
  );
};

export default Basics;
