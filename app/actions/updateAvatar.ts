
'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {AccountAttrs} from '@/app/config/types';

export const updateAvatar = async (profileId: string, body: FormData): Promise<AccountAttrs | undefined> => {
  let result;
  try {
    result = await apiClient(`${ENDPOINTS.PROFILES}/${profileId}`, {
      method: 'PUT',
      body,
    });
  } catch (error) {
    console.error('Failed to update your profile', error);
  }

  return result;
};
