import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {ProjectProps} from '@/app/components/Feed/types';

export const addProjectPhoto = async (projectId: number, body: FormData): Promise<ProjectProps | undefined> => {
  let result;
  try {
    const project = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body,
    });
    result = project;
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }

  return result;
};
