import {ChangeEvent} from 'react';

import {ImageData} from '@/app/components/Projects/types';
import {AccountAttrs, ImageFormats} from '@/app/config/types';

export interface Contribution {
  id: number;
  documentId: string;
  amount: number;
  contribution_tier: {
    id: number;
    documentId: string;
    name: string;
    project: {
      id: number;
      documentId: string;
      name: string;
      images: ImageData[];
    };
  };
}

export interface ContributionProps {
  data: Contribution;
}

export interface FileEvent {
  uri: string;
  name: string;
  type: string;
}

export interface WalletProps {
  data: AccountAttrs;
}

export interface AvatarAttrs {
  profileId: string;
  data: ImageFormats;
}

export interface AboutMeAttrs {
  data: AccountAttrs;
}

export interface BoxTitleAttr {
  children: string;
  className?: string;
}

export interface BadgeAttrs {
  name: string;
  isActive?: boolean;
}

export interface BadgesAttrs {
  achievedBadges: string[];
}

export interface PointsAttrs {
  points: number;
}

export interface TotalContributionsAttrs {
  amount: string;
}

export interface BalancesAttrs {
  balances: string[]
  disconnect: () => void;
}


export enum SupportedSocials {
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
}

export interface Social {
  platform: SupportedSocials;
  username: string;
}

export interface SocialsAttrs {
  profileId: string;
  socials: Social[];
}

export interface SocialItemAttrs {
  platform: SupportedSocials;
  isEditing: boolean;
  value: string;
  saving: boolean;
  onChange: (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  setIsEditing: (value: boolean) => void;
}

export interface ActivityAttrs {
  data: {
    likesCount: number;
    projectsCount: number;
    reachCount: number;
  }
}
