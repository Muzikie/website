'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const createProject = async (data: Record<string, unknown>) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(ENDPOINTS.PROJECTS, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    if (res.documentId) {
      result.success = true;
    } else {
      result.error = 'Failed to create project';
    }
  } catch (error) {
    console.error('Failed to create project:', error);
    result.error = 'Failed to create project. Have you deposited SOL tokens?';
  }

  return result;
};