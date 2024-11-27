import type {Project, ProjectStatus, ImageData} from '../Projects/types';
import type {FetchStatus, ImageFormats} from '@/app/config/types';

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

export interface ReadableImageProps {
  index: number;
  image: {
    attributes: {
      formats: ImageFormats;
    };
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
  id: number;
}

export interface GalleryEditableProps {
  images: ImageData[];
  id: number;
}

export interface GalleryProps {
  images: ImageData[];
  id: number;
  ownerId?: number;
  projectStatus?: ProjectStatus;
  refresh: () => Promise<void>;
}

export interface ArtistShareProp {
  attributes: {
    formats?: ImageFormats;
    first_name: string;
    last_name: string;
  };
}
export interface ActionsProps {
  owner: ArtistShareProp;
  project: Project;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
