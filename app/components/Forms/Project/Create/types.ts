import {SongAttributes, FetchStatus} from '@/app/config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface CreateProjectReviewProps {
  data?: Partial<ProjectAttrs>;
  onEdit: () => void;
  onSubmit: (data: Partial<ProjectAttrs>) => Promise<void>;
  feedback: {
    status: FetchStatus;
    message: string;
  };
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}

export interface CreateProjectFormProps {
  initialData?: Partial<ProjectAttrs>;
  onProceed: (data: Partial<ProjectAttrs>) => void;
}