'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getProjectContributionTier = async (projectId: string) => {
  let result = [];

  try {
    const {data: project} = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`);
    const params = {
      filters: {
        project: project.id,
      },
    };
    const res = await apiClient(ENDPOINTS.CONTRIBUTION_TIERS, {params});
    if (Array.isArray(res?.data)) {
      result = res?.data;
    } else {
      throw new Error('Failed to fetch contribution tiers');
    }
  } catch (error) {
    console.error('Failed to fetch contribution tiers', error);
    result.error = 'Failed to fetch contribution tiers';
  }

  return result;
};