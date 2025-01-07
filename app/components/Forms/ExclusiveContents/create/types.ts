import {FetchStatus} from '@/app/config/types';
import {ContributionTier} from '../../../Projects/types';

export interface PostExclusiveContentsFormProps {
  projectId: number;
}
export interface FormData {
  title: string;
  description: string;
  accessible_tiers: number[];
}

export type ExclusiveContent = {
  id: number;
  documentId: string;
} & FormData

export interface PostExclusiveContentsReviewProps {
  data: {
    title: string;
    description: string;
    accessible_tiers: ContributionTier[];
  };
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface AccessibleTiersSelectProps {
  tiers: ContributionTier[];
  onSelect: (item: ContributionTier) => void;
  selection: number[];
}
