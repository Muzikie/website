import type {Project} from '../Projects/types';
import type {FetchStatus, AccountAttrs} from '@/app/config/types';

export interface ProjectDetailsProps {
  project: Project;
  artist: AccountAttrs;
  onRefresh:  () => Promise<void>;
}

export interface ArtistProps {
  data: AccountAttrs;
}

export interface DeadlineProps {
  date: string;
}

export interface FundingProgressProps {
  currentFunding: string;
  softGoal: number;
  hardGoal: number;
}

export interface ActionsProps {
  owner: AccountAttrs;
  project: Project;
  refresh: () => Promise<void>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
