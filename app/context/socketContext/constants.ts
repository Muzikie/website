import { DefaultValues } from './types';
import { Method } from './types';

export const DEFAULT_VALUES: DefaultValues = {
  [Method.auth_getAuthAccount]: {
    mandatoryKeys: [],
    optionalKeys: [],
    numberOfSignatures: 0,
    nonce: '0',
  },
  [Method.token_getBalances]: {
    balances: [],
  },
  [Method.postTransaction]: {
    transactionID: '',
  },
  [Method.dryRunTransaction]: {
    events: [],
    success: false,
    result: -1,
  },
  [Method.collection_getAccount]: {
    collection: {
      collections: [],
    },
  },
  [Method.collection_getCollection]: {
    name: '',
    releaseYear: '',
    profileName: '',
    coProfiles: [],
    collectionType: 1,
    audios: [],
    hash: '',
    meta: '',
    creatorAddress: '',
  },
  [Method.audio_getAccount]: {
    audio: {
      audios: [],
    },
  },
  [Method.audio_getAudio]: {
    name: '',
    releaseYear: '',
    profileName: '',
    collectionID: '',
    genre: [],
    owners: [],
    hash: '',
    meta: '',
    creatorAddress: '',
  },
  [Method.subscription_getAccount]: {
    subscription: {
      owned: [],
      shared: '',
    },
  },
  [Method.subscription_getSubscription]: {
    price: '0',
    consumable: '0',
    streams: '0',
    members: [],
    maxMembers: 0,
    creatorAddress: '',
  },
};

export enum EVENTS {
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
}

export const MESSAGES = {
  NOT_READY: 'WS connection is not established',
  FAILED: 'WS request failed',
};
