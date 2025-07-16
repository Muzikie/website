'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {ContributionsOverview} from '../config/types';

export const getContributionsOverview = async () => {
  let account = {};

  try {
    account = await apiClient(ENDPOINTS.CONTRIBUTIONS_OVERVIEW);
  } catch (error) {
    console.error('Failed to fetch contributions overview:', error);
  }

  return account as ContributionsOverview;
};
