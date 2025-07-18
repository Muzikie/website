'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {AccountAttrs} from '../config/types';

export const getUserAccount = async () => {
  let account = {};

  try {
    account = await apiClient(ENDPOINTS.ME);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }

  return account as AccountAttrs;
};
