'use server';

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const reactToProject = async (projectId: number, hasReaction: boolean) => {
    try {
      const method = hasReaction ? 'DELETE' : 'POST';
      const url = hasReaction
        ? `${ENDPOINTS.REACTIONS}/${projectId}`
        : `${ENDPOINTS.REACTIONS}`;

      const res = await apiClient(url, {
        method,
        ...(method === 'POST' && {
          body: JSON.stringify({
            data: {
              emoji: '👍',
              entity_type: 'project',
              project: projectId,
            },
          }),
        }),
      });


      // Success: Return true for both POST and DELETE
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error during reaction operation:', error);
      return { success: false, error: 'Failed to toggle reaction' };
    }
  };