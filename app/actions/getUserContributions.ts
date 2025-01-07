
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getUserContributions = async (id?: number) => {
  let contributions = [];

  try {
    if (!id) {
      throw new Error('Missing id parameter')
    }

    const url = `${ENDPOINTS.CONTRIBUTIONS}?populate[contribution_tier][populate][project][populate]=images&filters[users_permissions_user]=${id}`
    const result = await apiClient(url);
    if (Array.isArray(result.data)) {
      contributions = result.data;
    }
  } catch (error) {
    console.error('Failed to delete photo:', error);
  }

  return contributions;
};
