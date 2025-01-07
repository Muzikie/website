import type {Project} from '../Projects/types';
import type {FetchStatus, AccountAttrs} from '@/app/config/types';

export interface ProjectDetailsProps {
  projectId: string;
}

export interface ArtistProps {
  data: AccountAttrs;
}

export interface DeadlineProps {
  date: string;
}

export interface FundingProgressProps {
  currentFunding: string;
  softGoal: string;
  hardGoal: string;
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
