import {FetchStatus} from '@/app/config/types';

export interface ContributionTier {
  projectId: string; // used in routing as documentID
}

export interface CreateContributionTierReviewProps {
  projectId: string; // used in routing as documentID
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
