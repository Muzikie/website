'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {ProjectAttrs} from '@/app//components/Projects/types';

export const createProject = async (data: ProjectAttrs) => {
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
    result.error = 'Failed to create project';
  }

  return result;
};