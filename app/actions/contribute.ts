'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const contribute = async (documentId: string) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(ENDPOINTS.CONTRIBUTIONS, {
      method: 'POST',
      body: JSON.stringify({
        data: { contribution_tier: documentId },
      }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to contribute to the project';
    }
  } catch (error) {
    console.error('Failed to contribute to the project:', error);
    result.error = 'Failed to contribute to the project. Have you deposited SOL tokens?';
  }

  return result;
};