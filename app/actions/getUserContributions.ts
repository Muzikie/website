
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getUserContributions = async (id?: number) => {
  let contributions = [];
  if (id) {
    try {
      const result = await apiClient(ENDPOINTS.CONTRIBUTIONS, {
        params: {
          filters: {users_permissions_user: id},
          include: {
            project: ['*'],
            contribution_tier: ['*'],
          },
        }
      });
      if (Array.isArray(result.data)) {
        contributions = result.data;
      }
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  }

  return contributions;
};
