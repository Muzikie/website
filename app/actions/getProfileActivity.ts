'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getProfileActivity = async (id: number) => {
  let result = {
    data: {
      likesCount: 0,
      projectsCount: 0,
      reachCount: 0,
    },
  };

  try {
    const activity = await apiClient(`${ENDPOINTS.PROFILES}/${id}/activity`);
    result = {
      data: {
        likesCount: activity.likesCount,
        projectsCount: activity.projectsCount,
        reachCount: activity.reachCount,
      }
    };
  } catch (error) {
    console.error('Failed to fetch profile activity', error);
    result.error = 'Failed to fetch profile activity';
    console.log('getProfileActivity error', error);
  }

  return result;
};