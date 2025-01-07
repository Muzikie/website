'use client'

import React, {useEffect} from 'react';
import NextImage from 'next/image';
import {useRouter} from 'next/navigation';

import loading from '@/public/images/loading.svg';
import {View, H4} from '@/app/components/Polyfills';
import {signOut} from '@/app/actions/auth';
import { Routes } from '@/app/config/routes';

const Logout = () => {
  const {replace, back} = useRouter();

  const action = async () => {
    const res = await signOut();
    if (res.success) {
      replace(Routes.Login);
    } else {
      back();
    }
  }

  useEffect(() => {
    action();
  }, []);

  return (
    <View className="w-full h-full flex flex-row justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <NextImage alt="Loading" src={loading} className="animate-spin" />
        <H4 className="mt-6 text-neutralSteady">Logging out</H4>
      </View>
    </View>
  );
}

export default Logout;