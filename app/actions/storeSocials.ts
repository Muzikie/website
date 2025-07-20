
'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {SupportedSocials} from '@/app/components/Profile/types';

type Socials = Record<SupportedSocials, string>

export const storeSocials = async (profileId: string, socials: Socials): Promise<{success: boolean, message: string}> => {
  const defaultError = 'Failed to store social media usernames';
  let result = {
    success: false,
    message: defaultError,
  };
  // @todo remove base URLS and simply keep the usernames
  const body = JSON.stringify({socials});
  try {
    result = await apiClient(`${ENDPOINTS.PROFILES}/${profileId}`, {
      method: 'PUT',
      body,
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
