
'use server'

import {Profile} from '@/app/config/types';
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const updateProfile = async (data: Partial<Profile>, profileId: string) => {
  const result = {
    success: false,
    error: '',
  };
  if (data.first_name || data.last_name) {
    try {
      const response = await apiClient(`${ENDPOINTS.PROFILES}/${profileId}`, {
        method: 'PUT',
        body: JSON.stringify({data}),
      });
      if (!response.data) {
        throw new Error('Failed to update your profile')
      }
      result.success = true;
    } catch (error) {
      result.error = 'Failed to update your profile';
      console.error('Failed to update your profile', error);
    }
  } else {
    result.error = 'Provider at least one of first name or last name'
  }

  return result;
};
