'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {getContract} from '@/app/utils/blockchain';
import {TierData} from '@/app/components/Forms/Project/Contribute/types';

export const contribute = async (campaignId:number, tierData: TierData) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const campaignContract = getContract();
    const tx = await campaignContract.contribute(campaignId, tierData.index);
    await tx.wait();

    const res = await apiClient(ENDPOINTS.CONTRIBUTIONS, {
      method: 'POST',
      body: JSON.stringify({
        data: { contribution_tier: tierData.documentId },
      }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to contribute to the project';
    }
  } catch (error) {
    console.error('Failed to contribute to the project:', error);
    result.error = 'Failed to contribute to the project. Have you deposited SOL tokens?';
  }

  return result;
};