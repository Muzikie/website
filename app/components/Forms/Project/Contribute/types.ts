import {FetchStatus} from '@/app/config/types';
import {Account} from '@/app/config/types';
import {Project} from '@/app/components/Projects/types';

export interface ContributionTier {
  id: number;
  documentId: string;
  name: string;
  description: string;
  rewards: string;
  amount: number;
}

export interface ContributeProps {
  project: Project;
  artist: Account;
  options: TierData[];
}

export interface TierData {
  index: number;
  id: string;
  documentId: string;
}
export interface ContributeOptionProps {
  data: ContributionTier;
  selected: boolean;
  onSelected: (id: number) => void;
}

export interface ContributionReviewProps {
  id: string;
  projectId: string;
  data: {
    name: string;
    rewards: string;
    amount: number;
  };
  refresh: () => Promise<void>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
