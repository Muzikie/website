'use client'

import React, { FC } from 'react';
import { redirect } from 'next/navigation';
import NextImage from 'next/image';

import {AUTH_PROVIDERS} from '@/app/config/constants';
import {apiBaseUrl} from '@/app/config/endpoints';
import {H3, H4, View} from '@/app/components/Polyfills';
import {Button, Icon} from '@/app/components/Elements';
import appLogo from '@/public/images/logo.svg';

const Login: FC = () => {
  const onPress = (provider: string) => {
    redirect(`${apiBaseUrl}/connect/${provider}`);
  }

  return (
    <View className="px-6 w-[510px] flex flex-col justify-center items-center gap-6">
      <View className="flex flex-row justify-center items-center">
        <NextImage alt="App Logo" src={appLogo} width={150} height={150} />
      </View>

      <H3 className="text-primaryStrong py-6">Login using your Google account</H3>

      {
        AUTH_PROVIDERS.map(provider => (
          <Button
            className="min-w-[300px]"
            key={provider}
            onPress={() => onPress(provider)}
            title={
              <View className="flex flex-row justify-between items-center px-4">
                <Icon name="google" color="#fff" />
                <H4 className="text-white grow !text-normal">Google</H4>
              </View>
            }
          />
        ))
      }
    </View>
  );
};

export default Login;
