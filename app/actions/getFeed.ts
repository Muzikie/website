export const dynamic = 'force-dynamic';

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

export const getFeed = async () => {
  let result = {
    data: [],
  };
  try {
    result = await apiClient(ENDPOINTS.FEED);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return result;
};