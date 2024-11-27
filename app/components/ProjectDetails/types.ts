import type {Project} from '../Projects/types';
import type {FetchStatus, ImageFormats} from '@/app/config/types';

export interface ProjectDetailsProps {
  projectId: number;
}

export interface ArtistProps {
  data: {
    first_name: string;
    last_name: string;
    avatar: {
      data: {
        attributes: {
          formats: ImageFormats;
        };
      } | null;
    };
    instagram: string;
    twitter: string;
    twitch: string;
  };
}

export interface DeadlineProps {
  date: string;
}

export interface FundingProgressProps {
  currentFunding: number;
  softGoal: number;
  hardGoal: number;
}

export interface ArtistShareProp {
  id: number;
  attributes: {
    formats?: ImageFormats;
    first_name: string;
    last_name: string;
  };
}
export interface ActionsProps {
  owner: ArtistShareProp;
  project: Project;
  refresh: () => Promise<void>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
