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