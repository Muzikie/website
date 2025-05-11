
import { ethers } from 'ethers';
import campaignJson from '@/app/config/abi.json';

const RPC_URL = process.env.RPC_URL || '';
if (!RPC_URL) {
  throw new Error('Missing env variable RPC_URL');
}
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
if (!PRIVATE_KEY) {
  throw new Error('Missing env variable PRIVATE_KEY');
}
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '';
if (!CONTRACT_ADDRESS) {
  throw new Error('Missing env variable CONTRACT_ADDRESS');
}

export const getContract = () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const campaignContract = new ethers.Contract(CONTRACT_ADDRESS, campaignJson.abi, wallet);
  return campaignContract;
};

