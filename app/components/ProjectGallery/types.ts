import type {Project, ProjectStatus, ImageData} from '../Projects/types';
import type {AccountAttrs, FetchStatus, ImageFormats} from '@/app/config/types';

export interface ProjectDetailsProps {
  id: string;
  name: string;
  summary: string;
}

export interface ArtistProps {
  data: {
    first_name: string;
    last_name: string;
    avatar: {
      formats: ImageFormats;
    } | null;
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

export interface ReadableImageProps {
  index: number;
  image: {
    formats: ImageFormats;
  };
}

export interface EditableImageProps {
  index: number;
  image: ImageData;
  disabled?: boolean;
  onRemove: (index: number) => Promise<void>;
  onAdd: (data: FormData) => Promise<void>;
}

export interface GalleryReadableProps {
  images: ImageData[];
  id: string;
}

export interface GalleryEditableProps {
  images: ImageData[];
  id: string;
}

export interface GalleryProps {
  images: ImageData[];
  id: string;
  ownerId?: number;
  projectStatus?: ProjectStatus;
  refresh: () => Promise<void>;
}

export interface ActionsProps {
  owner: AccountAttrs;
  project: Project;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
