import {FetchStatus} from '@/app/config/types';
import {ProjectAttrs} from '../../../Projects/types';

export interface CreateProjectReviewProps {
  data: Omit<ProjectAttrs, 'users_permissions_user' | 'project_type'>;
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

export interface CreateProjectFormProps {
  initialData?: Partial<ProjectAttrs>;
  onProceed: (data: Partial<ProjectAttrs>) => void;
}