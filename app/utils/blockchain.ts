
import { ethers } from 'ethers';
import melogyneAbi from '@/app/config/melodyneAbi.json';
import usdcAbi from '@/app/config/usdcAbi.json';

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
const USDC_ADDRESS = process.env.USDC_ADDRESS || '';
if (!USDC_ADDRESS) {
  throw new Error('Missing env variable USDC_ADDRESS');
}

export const getContract = () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider); // @todo private key?
  const campaignContract = new ethers.Contract(CONTRACT_ADDRESS, melogyneAbi, wallet);
  return campaignContract;
};

export const getUsdcContract = () => {
  const campaignContract = new ethers.Contract(USDC_ADDRESS, usdcAbi);
  return campaignContract;
};

