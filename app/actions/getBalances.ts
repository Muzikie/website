'use server'

import {Balance} from '@/app/config/types';

export const getBalances = async (address: string): Promise<Balance[]> => {
  try {
    const response = {};
    // const response = await klayrClient<Balances>(KLAYR_ENDPOINTS.BALANCE, {address});
    if (!response.success) {
      throw new Error('Failed to fetch balances');
    }

    return response.data.balances ?? [];
  } catch (err) {
    console.error('Failed to fetch balances', err);
    return [];
  }
};
