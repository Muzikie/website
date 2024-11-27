'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const editProject = async (data: Record<string, unknown>, projectId: number) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const res = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to update project';
    }
  } catch (error) {
    console.error('Failed to update project:', error);
    result.error = 'Failed to update project.';
  }

  return result;
};