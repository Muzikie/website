import {FetchStatus} from '@/app/config/types';
export interface Feedback {
  status: FetchStatus;
  message: string;
}
