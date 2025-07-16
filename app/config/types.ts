export interface KeyValue {
  [key: string]: unknown;
}

interface LockedBalance {
  amount: string;
  height: number;
}

export interface Balance {
  tokenID: string;
  availableBalance: string;
  lockedBalances: LockedBalance[];
}

export interface Auth {
  nonce: bigint;
  optionalKeys: Buffer[];
  mandatoryKeys: Buffer[];
}

export enum ImageSizes {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Thumbnail = 'thumbnail',
}

export interface ImageFormats {
  [ImageSizes.Large]: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
  [ImageSizes.Medium]: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
  [ImageSizes.Small]: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
  [ImageSizes.Thumbnail]: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
}

export interface ImageSource {
  src: string;
  width: number;
  height: number;
}

export interface Profile {
  id: number;
  documentId: string;
  first_name: string;
  last_name: string;
  points: number;
  avatar: {
    id: number;
    documentId: string;
    formats: ImageFormats;
  };
  twitter: string;
  instagram: string;
  twitch: string;
}

export interface AccountAttrs {
  first_name: string;
  last_name: string;
  bio?: string;
  points: number;
  email: string;
  id: number;
  documentId: string;
  profileId: string;
  address: string;
  avatarUrl: string | null;
  avatar: {
    id: number;
    formats: ImageFormats;
  };
  twitter: string;
  instagram: string;
  twitch: string;
}

export type Account  = {
  id: number;
  documentId: string;
} & AccountAttrs;

export enum FetchStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export const SubmitTitle = {
  [FetchStatus.Idle]: 'Submit',
  [FetchStatus.Pending]: 'Submitting',
  [FetchStatus.Error]: 'Failed',
  [FetchStatus.Success]: 'Succeeded',
};

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export type Timeout = NodeJS.Timeout;

export interface QuickAction {
  type: string;
  title: string;
  icon: string;
  userInfo: {
    url: string;
  };
}

type SearchParamsDefault = { [key: string]: string | string[] | undefined };
type ParamsDefault = Record<string, unknown>;
export type Params<T = ParamsDefault> = T extends object ? Promise<T> : Promise<ParamsDefault>;
export type SearchParams<T = SearchParamsDefault> = T extends object ? Promise<T> : Promise<SearchParamsDefault>;

export type SamSite = true | false | 'lax' | 'strict' | 'none' | undefined;

export enum SupportedTokens {
  LSK = 'LSK',
  ETH = 'ETH',
  USDC = 'USDC',
}

export enum SupportedBlockchains {
  LISK = 'lisk',
  ETHEREUM = 'ethereum',
}

export enum SupportedWallets {
  META_MASK = 'metamask',
}
export interface WalletInput {
  public_key: string;
  address: string;
  blockchain: SupportedBlockchains;
  wallet_type: SupportedWallets;
}

export interface ContributionsOverview {
  total_contributions_amount: string,
  total_contributions_count: number,
  unique_projects_count: number,
  latest_contribution_at: number,
  top_contributed_project: number,
  average_contribution_amount: string,
}