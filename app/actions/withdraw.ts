'use server'

import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {getContract} from '@/app/utils/blockchain';
import {ProjectStatus} from '@/app/components/Projects/types';
import { getProjectDetails } from './getProjectDetails';

export const withdraw = async (projectId: string) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const {project} = await getProjectDetails(projectId);
    const campaignContract = getContract();
    const tx = await campaignContract.withdraw(project.on_chain_id);
    await tx.wait();
    const res = await apiClient(`${ENDPOINTS.PROJECTS}/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {project_status: ProjectStatus.Withdrawn}
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