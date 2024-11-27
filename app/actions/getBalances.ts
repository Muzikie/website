'use server'

import {KLAYR_ENDPOINTS} from '@/app/config/endpoints';
import {klayrClient} from '@/app/utils/klayrClient';

export const getBalances = async (address: string) => {
  try {
    const res = await klayrClient(KLAYR_ENDPOINTS.BALANCE, {address});
    console.log('getBalances', res);

    return '0 KLY';
  } catch (error) {
    console.error('Failed to get wallet balances:', error);
    return '0 KLY';
  }
};