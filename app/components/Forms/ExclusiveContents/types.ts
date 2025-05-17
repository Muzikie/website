import {ContributionTier} from '@/app/components/Projects/types';

export interface FormData {
  title: string;
  description: string;
  accessible_tiers: number[];
}

export interface ExclusiveContentData {
  title: string;
  description: string;
  accessible_tiers: ContributionTier[];
}

export interface PostExclusiveContent {
  projectId: string;
  contributionTiers: ContributionTier[];
}


export type ExclusiveContent = {
  id: number;
  documentId: string;
} & FormData


export interface PostExclusiveContentsReviewProps {
  projectId: string;
}

export interface AccessibleTiersSelectProps {
  tiers: ContributionTier[];
  onSelect: (item: ContributionTier) => void;
  selection: number[];
}

