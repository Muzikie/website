export const dynamic = 'force-dynamic';

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';

interface getUserCampaignsProps {
  max: number;
  userId: number;
}

export const getUserCampaigns = async ({max, userId}: getUserCampaignsProps) => {
  let result = {
    data: [],
  };
  const params = {
    include: {
      images: ['*'],
    },
    filters: {
      users_permissions_user: userId,
    },
    pagination: {
      pageSize: Math.min(max, 3),
      page: 1,
    },
  };

  try {
    result = await apiClient(ENDPOINTS.PROJECTS, {params});
    console.log('getUserCampaigns -> ', result);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  return result;
};