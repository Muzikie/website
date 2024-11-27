'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {Account, AccountAttrs} from '@/app/config/types';
import {Project, ProjectAttrs, ProjectReadOnlyAttrs} from '@/app/components/Projects/types';

interface ProjectDetailsResponse {
  project: Project;
  artist: Account;
}

export const getProjectDetails = async (id: number): Promise<ProjectDetailsResponse> => {
  const projectParams = {
    include: {
      users_permissions_user: ['email'],
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

  let project = {attributes: {} as (ProjectAttrs & ProjectReadOnlyAttrs), id: 0};
  let artist = {attributes: {} as AccountAttrs, id: 0};
  try {
    const data = await apiClient(`${ENDPOINTS.PROJECTS}/${id}`, {params: projectParams});
    if (Array.isArray(data?.data)) {
      project = data?.data[0];
    } else if (data?.data?.attributes) {
      project = data?.data;
    }

    if (project.attributes?.users_permissions_user?.data.id) {
      artistParams.filters.users_permissions_user = project.attributes?.users_permissions_user?.data.id;
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
