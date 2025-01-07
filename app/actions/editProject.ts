'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {Project} from '../components/Projects/types';

export const editProject = async (data: Project, projectId: string) => {
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