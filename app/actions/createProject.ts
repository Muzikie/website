'use server'

import { ethers } from 'ethers';
import campaignJson from '@/app/config/abi.json';
import {ENDPOINTS} from '@/app/config/endpoints';
import {apiClient} from '@/app/utils/apiClient';
import {getContract} from '@/app/utils/blockchain';
import {ProjectAttrs} from '@/app//components/Projects/types';

export const createProject = async (data: ProjectAttrs) => {
  const result = {
    success: false,
    error: '',
  };

  try {
    const deadline = Math.floor(new Date(data.planned_release_date as string).getTime() / 1000); // timestamp in seconds
    const goal = ethers.parseEther(data.soft_goal.toString());
    const hardCap = ethers.parseEther(data.hard_goal.toString());

    const campaignContract = getContract();
    const tx = await campaignContract.createCampaign(goal, hardCap, deadline);
    const receipt = await tx.wait();
    if (!receipt.hash) {
      throw new Error('Error creating project.');
    }

    const iface = new ethers.Interface(campaignJson.abi);

    let campaignId: string | null = null;
    for (const log of receipt.logs) {
      try {
        const parsed = iface.parseLog(log);
        if (parsed?.name === 'CampaignCreated') {
          campaignId = parsed.args[0].toString();
          break;
        }
      } catch (err) {
        console.log('Skip log', err);
        continue;
      }
    }

    if (!campaignId) {
      throw new Error('CampaignCreated event not found in transaction receipt');
    }

    const res = await apiClient(ENDPOINTS.PROJECTS, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });

    if (res.documentId) {
      result.success = true;
    } else {
      result.error = 'Failed to create project';
    }
  } catch (error) {
    console.error('Failed to create project:', error);
    result.error = 'Failed to create project. Have you deposited SOL tokens?';
  }

  return result;
};