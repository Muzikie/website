import {SongAttributes, FetchStatus} from '@/app/config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface EditProjectFormProps {
  projectId: number;
  initialData: Partial<ProjectAttrs>;
  onProceed: (data: Partial<ProjectAttrs>) => void;
}

export interface EditProjectReviewProps {
  projectId: number;
  data?: Partial<ProjectAttrs>;
  onEdit: () => void;
  onSubmit: (data: Partial<ProjectAttrs>, id: number) => Promise<void>;
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
