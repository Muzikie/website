import {AccountAttrs} from '@/app/config/types';
import {Project} from '../Projects/types';

export interface PublishedProjectOwnerProps {
  project: Project;
  account?: AccountAttrs;
  artist: AccountAttrs;
}
export interface FullDataComponentProps {
  project: Project;
  account?: AccountAttrs;
  artist: AccountAttrs;
  refresh: () => Promise<void>;
}

export interface SuccessfulProjectOwnerProps {
  projectId: string;
  onChainId: number;
}

export interface DefaultProjectStatusProps {
  projectId: string;
  refresh: () => Promise<void>;
}
