export const API_SUFFIX = 'api';

const mainChainId = 1135;
const sepoliaChainId = 4202;
export const LISK_MAIN_CHAIN_ID = '0x' + (mainChainId).toString(16);
export const LISK_SEPOLIA_CHAIN_ID = '0x' + (sepoliaChainId).toString(16);

export const liskMainNet = {
  chainId: LISK_MAIN_CHAIN_ID,
  chainName: 'Lisk Mainnet',
  nativeCurrency: {
    name: 'Lisk',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.api.lisk.com'],
  blockExplorerUrls: ['https://blockscout.lisk.com'],
}

export const liskSepoliaNet = {
  chainId: LISK_SEPOLIA_CHAIN_ID,
  chainName: 'Lisk Mainnet',
  nativeCurrency: {
    name: 'Lisk',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.sepolia-api.lisk.com'],
  blockExplorerUrls: ['https://sepolia-blockscout.lisk.com'],
}


export const NETWORK = process.env.NETWORK === 'sepolia' ? liskSepoliaNet : liskMainNet;
export const CHAIN_ID = process.env.NETWORK === 'sepolia' ? LISK_SEPOLIA_CHAIN_ID : LISK_MAIN_CHAIN_ID;