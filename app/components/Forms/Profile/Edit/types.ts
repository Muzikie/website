import {SongAttributes, FetchStatus} from '@/app/config/types';
import {Profile} from '@/app/context/accountContext/types';

export interface ProfileEditReviewProps {
  data: Partial<Omit<Profile, 'avatar'>>;
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export interface ConfirmProps {
  anchor: SongAttributes;
  onDone: (feedback: Feedback) => void;
}
