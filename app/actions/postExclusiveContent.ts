'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import { PostExclusiveContentData } from '@/app/components/Feed/types';

export const postExclusiveContent = async (data: PostExclusiveContentData) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(`${ENDPOINTS.EXCLUSIVE_CONTENT}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to create exclusive content';
    }
  } catch (error) {
    console.error('Failed to create exclusive content:', error);
    result.error = 'Failed to create exclusive content.';
  }

  return result;
};