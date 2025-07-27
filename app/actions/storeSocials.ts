
'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {Social} from '@/app/components/Profile/types';

export const storeSocials = async (profileId: string, socials: Social[]): Promise<{success: boolean, message: string}> => {
  const defaultError = 'Failed to store social media usernames';
  let result = {
    success: false,
    message: defaultError,
  };
  // @todo remove base URLS and simply keep the usernames
  try {
    await apiClient(`${ENDPOINTS.PROFILES}/${profileId}`, {
      method: 'PUT',
      body: JSON.stringify({data: {socials}}),
    });
    result = {
      success: true,
      message: '',
    };
  } catch (error) {
    console.error('Failed to update your profile', error);
    result.message = error?.message ?? defaultError
  }

  return result;
};
