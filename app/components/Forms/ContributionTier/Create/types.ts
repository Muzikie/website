import {FetchStatus} from '@/app/config/types';
import {ContributionTierAttrs, ProjectAttrs} from '@/app/components/Projects/types';

export interface ContributionTier {
  projectId: number;
  initialData: Partial<ProjectAttrs>;
  onProceed: (data: Partial<ProjectAttrs>) => void;
}

export interface CreateContributionTierReviewProps {
  projectId: number;
  data: Partial<ContributionTierAttrs>;
  onEdit: () => void;
  onSubmit: (data: Partial<ContributionTierAttrs>) => Promise<void>;
  feedback: {
    status: FetchStatus;
    message: string;
  };
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}
