import {FetchStatus} from '@/app/config/types';

export interface FeedbackProps {
  status: FetchStatus;
  message?: string;
}
