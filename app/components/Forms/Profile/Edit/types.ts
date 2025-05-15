import {FetchStatus} from '@/app/config/types';
import {Profile} from '@/app/config/types';

export interface ProfileEditReviewProps {
  data: Partial<Omit<Profile, 'avatar'>>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
