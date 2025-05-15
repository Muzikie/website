'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {WalletInput} from '@/app/config/types';

export const createWallet = async (data: WalletInput) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(ENDPOINTS.WALLETS, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    if (res.documentId) {
      result.success = true;
    } else {
      result.error = 'Failed to connect wallet';
    }
  } catch (error) {
    console.log('Failed to create wallet:', error);
  }

  return result;
};