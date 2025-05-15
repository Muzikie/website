'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {getContract} from '@/app/utils/blockchain';
import {ProjectStatus} from '@/app/components/Projects/types';
import { getProjectDetails } from './getProjectDetails';

export const publishProject = async (projectId: string) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const {project} = await getProjectDetails(projectId);

    const campaignContract = getContract();
    const tx = await campaignContract.publishCampaign(project.on_chain_id);
    await tx.wait();

    const res = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {project_status: ProjectStatus.Published}
      }),
    });

    if (res.data) {
      result.success = true;
    } else {
      result.error = 'Failed to publish the project';
    }
  } catch (error) {
    console.error('Failed to publish the project:', error);
    result.error = 'Failed to publish the project.';
  }

  return result;
};