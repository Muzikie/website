'use server';

import {cookies} from 'next/headers';
import {AUTH_COOKIE, DEAD_COOKIE, LIVE_COOKIE} from '@/app/config/constants';

export const signOut = async () => {
  try {
    const awaitedCookies = await cookies();
    awaitedCookies.set(AUTH_COOKIE, '', DEAD_COOKIE);
    return {success: true};
    // @ts-expect-error Error type is correct
  } catch (error: Error) {
    console.error('Failed to sign out:', error);
    return {success: false, error: error.message};
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL}/proxy/auth/local`;
    console.log(`url -> ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    console.log(`response -> ${JSON.stringify(response)}`);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const json = await response.json();
    console.log(`json -> ${JSON.stringify(json)}`);
    if (json.jwt) {
      const awaitedCookies = await cookies();
      awaitedCookies.set(AUTH_COOKIE, json.jwt, LIVE_COOKIE);
      const savedCookie = awaitedCookies.get(AUTH_COOKIE);
      console.log(`savedCookie -> ${JSON.stringify(savedCookie)}`);
      if (!savedCookie || savedCookie.value !== json.jwt) {
        throw new Error('Failed to persist auth cookie.');
      }

      return {success: true};
    }
    return {success: true, error: 'invalid credentials'};
    // @ts-expect-error Error type is correct
  } catch (error: Error) {
    console.error('Failed to sign in:', error);
    return {success: false, error: error.message};
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL}/proxy/auth/local/register`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const json = await response.json();

    if (json.jwt) {
      const awaitedCookies = await cookies();
      awaitedCookies.set(AUTH_COOKIE, json.jwt, LIVE_COOKIE);
      return {success: true};
    }
    return {success: true, error: 'invalid credentials'};
    // @ts-expect-error Error type is correct
  } catch (error: Error) {
    console.error('Failed to sign up:', error);
    return {success: false, error: error.message};
  }
};
