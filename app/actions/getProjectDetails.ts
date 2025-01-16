'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {AccountAttrs} from '@/app/config/types';
import {Project} from '@/app/components/Projects/types';

interface ProjectDetailsResponse {
  project: Project;
  artist: AccountAttrs;
}

export const getProjectDetails = async (id: string): Promise<ProjectDetailsResponse> => {
  const projectParams = {
    include: {
      users_permissions_user: ['*'],
      images: ['*'],
    },
  };
  
  const artistParams = {
    include: {
      avatar: ['*'],
    },
    filters: {
      users_permissions_user: -1,
    },
  };

  let project = {} as Project;
  let artist = {} as AccountAttrs;
  try {
    const data = await apiClient(`${ENDPOINTS.PROJECTS}/${id}`, {params: projectParams});
    if (data?.data.documentId === id) {
      project = data?.data;
    }

    if (project.users_permissions_user) {
      artistParams.filters.users_permissions_user = project.users_permissions_user.id;
      const data = await apiClient(ENDPOINTS.PROFILES, {params: artistParams});
      if (data?.data?.length) {
        artist = data?.data[0];
      }
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return {
    project,
    artist,
  };
};
