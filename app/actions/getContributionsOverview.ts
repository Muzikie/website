'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {ContributionsOverview} from '../config/types';

export const getContributionsOverview = async () => {
  let response = {
    total_contributions_amount: '0',
    total_contributions_count: 0,
    unique_projects_count: 0,
    latest_contribution_at: 0,
    top_contributed_project: 0,
    average_contribution_amount: '0',
  };

  try {
    response = await apiClient(ENDPOINTS.CONTRIBUTIONS_OVERVIEW);
  } catch (error) {
    console.error('Failed to fetch contributions overview:', error);
  }

  return response as ContributionsOverview;
};
