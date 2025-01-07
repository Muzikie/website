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
  const response = await klayrClient<Balances>(KLAYR_ENDPOINTS.BALANCE, {address});
  if (response.success && response.data.balances.length) {
    return response.data.balances.map(({availableBalance}) => fromBaseToken(availableBalance, 4, true));
  } else {
    return [fromBaseToken('0', 4, true)]
  }
};