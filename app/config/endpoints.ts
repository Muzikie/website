export const LAUNCH_PROTOCOL = 'muzikie://';

export const ENDPOINTS = {
  SONGS: '/songs',
  FEED: '/projects/feed',
  PROFILES: '/profiles',
  ME: '/profiles/me',
  PROJECTS: '/projects',
  CONTRIBUTION_TIERS: '/contribution-tiers',
  CONTRIBUTIONS: '/contributions',
  EXCLUSIVE_CONTENT: '/exclusive-contents',
  FILES: '/upload/files',
};

export const KLAYR_ENDPOINTS = {
  BALANCE: 'token_getBalances'
};


const IMAGE_PROTOCOL = process.env.NEXT_PUBLIC_IMAGE_PROTOCOL;
const IMAGE_HOSTNAME = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;
const IMAGE_PORT = process.env.NEXT_PUBLIC_IMAGE_PORT;

export const apiBaseUrl = `${IMAGE_PROTOCOL}://${IMAGE_HOSTNAME}${IMAGE_PORT ? ':' + IMAGE_PORT : ''}/api`
export const klayrBaseUrl = process.env.NEXT_PUBLIC_KLAYR_URL ?? 'ws://localhost:7887/rpc-ws';