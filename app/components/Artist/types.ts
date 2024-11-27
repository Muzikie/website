import type {ImageFormats} from '@/app/config/types';
export interface ArtistProps {
  data: {
    first_name: string;
    last_name: string;
    user_id: number;
    profile_id: number;
    avatar: {
      formats: ImageFormats;
    };
  };
}