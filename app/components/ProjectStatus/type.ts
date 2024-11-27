import {AccountAttrs} from '@/app/config/types';
import {ArtistShareProp} from '../ProjectDetails/types';
import {Project} from '../Projects/types';

export interface PublishedProjectOwnerProps {
  project: Project;
  account?: AccountAttrs;
  artist: ArtistShareProp;
}
export interface FullDataComponentProps {
  project: Project;
  account?: AccountAttrs;
  artist: ArtistShareProp;
  refresh: () => Promise<void>;
}

export interface SuccessfulProjectOwnerProps {
  projectId: number;
}

export interface DefaultProjectStatusProps {
  projectId: number;
  refresh: () => Promise<void>;
}
