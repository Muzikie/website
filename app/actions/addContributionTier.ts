'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {getContract} from '@/app/utils/blockchain';
import {getProjectDetails} from './getProjectDetails';

export const addContributionTier = async (data: Record<string, unknown>) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const {project} = await getProjectDetails(data.project as string);
    const campaignContract = getContract();
    const tx = await campaignContract.addTier(project.on_chain_id, data.amount);
    await tx.wait();

    const res = await apiClient(ENDPOINTS.CONTRIBUTION_TIERS, {
      method: 'POST',
      body: JSON.stringify({data}),
    });

    if (res.documentId) {
      result.success = true;
    } else {
      result.error = 'Failed to create contribution tier';
    }
  } catch (error) {
    console.error('Failed to create contribution tier:', error);
    result.error = 'Failed to create contribution tier.';
  }

  return result;
};