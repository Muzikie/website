'use client'

import React, {FC, useState} from 'react';
import NextImage from 'next/image';
import {useRouter} from 'next/navigation';

import { signIn, signUp } from '@/app/actions/auth';
import {Small, H3, Span, View, TextInput} from '../Polyfills';
import {Button, SafeArea} from '../Elements';
import appLogo from '../../../public/images/logo.svg';
import {Routes} from '@/app/config/routes';

const ErrorMessage: FC<{errorMessage: string}> = ({errorMessage}) => {
  if (typeof errorMessage !== 'string' || !errorMessage) {
    return null;
  }
  const networkReg = /network/i;
  let formattedMessage = errorMessage;

  if (networkReg.test(errorMessage)) {
    formattedMessage = 'Check your internet connection';
  } else {
    formattedMessage = 'The email/password combination was not correct.';
  }

  return (
    <View className="pb-4">
      <Small className="text-warnStrong">{formattedMessage}</Small>
    </View>
  );
};

const Login = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onLogin = async () => {
    const response = await signIn(email, password);
    if (!response.success) {
      setError(response.error)
    } else {
      router.replace(Routes.Home);
    }
  };

  const onRegister = async () => {
    const response = await signUp(email, password);
    if (!response.success) {
      setError(response.error)
    } else {
      router.replace(Routes.Home);
    }
  };

  const isButtonDisabled = !email || !password;

  return (
    <SafeArea className="flex flex-col justify-center items-center">
      <View className="px-6 w-[510px]">
        <View className="p-6 flex flex-row justify-center items-center">
          <NextImage alt="App Logo" src={appLogo} className="w-[150px]" />
        </View>

        <H3 className="text-primaryStrong py-6">Login</H3>

        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          keyboardType="password"
        />

        <ErrorMessage errorMessage={error} />

        <View className="flex flex-row nowrap gap-6 justify-center items-center">
          <Button
            onPress={onLogin}
            title="Sign in"
            disabled={isButtonDisabled}
          />
          <Span>Or</Span>
          <Button
            onPress={onRegister}
            title="Sign up"
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </SafeArea>
  );
};

export default Login;
