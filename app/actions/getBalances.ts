'use server'

import {KLAYR_ENDPOINTS} from '@/app/config/endpoints';
import {klayrClient} from '@/app/utils/klayrClient';
import {fromBaseToken} from '@/app/utils/formatters';

interface Balances {
  balances: {
    tokenID: string;
    availableBalance: string;
    lockedBalances: unknown[]
  }[]
} 

export const getBalances = async (address: string) => {
  try {
    const response = await klayrClient<Balances>(KLAYR_ENDPOINTS.BALANCE, {address});
    if (!response.success) {
      throw new Error('Failed to fetch balances');

    }
    return response.data.balances.map(({availableBalance}) => fromBaseToken(availableBalance, 4, true));
  } catch (err) {
    console.error('Failed to fetch balances', err);
    return [fromBaseToken('0', 4, true)]
  }
};