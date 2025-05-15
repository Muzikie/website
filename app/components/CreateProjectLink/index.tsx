'use client';
import React, {FC, useEffect, useState} from 'react';

import {Routes} from '@/app/config/routes';
import {Span, Link, View} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {useWallet} from '../Wallet/useWallet';

const CreateProjectLink: FC = () => {
  const [balance, setBalance] = useState('0');
  const {getBalance} = useWallet();

  const fetch = async () => {
    const balance = await getBalance();
    setBalance(balance);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (balance === '0') {
    return (
      <Link
        to={{screen: Routes.CreateProjects}}
        className="absolute right-8 bottom-8 rounded-3xl bg-neutralPure border-assureStrong p-2 shadow-lg hover:shadow-xl cursor-pointer">
        <View className="flex flex-row no-wrap">
          <Span className="text-neutralStrong !font-light">
            Top up to create a project
          </Span>
          <Icon name="plus" size={28} color="#3D3D3D" />
        </View>
      </Link>
    );
  }

  return (
    <Link
      to={{screen: Routes.CreateProjects}}
      className="absolute right-8 bottom-8 rounded-3xl bg-neutralPure border-assureStrong p-2 shadow-lg hover:shadow-xl cursor-pointer">
      <View className="flex flex-row no-wrap">
        <Span className="text-neutralStrong !font-light">
          Create a campaign
        </Span>
        <Icon name="plus" size={28} color="#3D3D3D" />
      </View>
    </Link>
  );
};

export default CreateProjectLink;
