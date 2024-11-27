'use server'

import React from 'react';
import NextImage from 'next/image';

import loading from '@/public/images/loading.svg';
import {View, H4} from '@/app/components/Polyfills';

const Logout = async () => (
  <View className="w-full h-full flex flex-row justify-center items-center">
    <View className="flex flex-col justify-center items-center">
      <NextImage alt="Loading" src={loading} className="animate-spin" />
      <H4 className="mt-6 text-neutralSteady">Logging out</H4>
    </View>
  </View>
);

export default Logout;