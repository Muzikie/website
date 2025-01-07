import {ElementType} from 'react';

import {Project, ProjectAttrs} from '@/app/components/Projects/types';

export enum FormStep {
  Form = 'form',
  Review = 'review',
}

export interface FormStepsProps {
  Form: ElementType;
  Review: ElementType;
  submit: (data: ProjectAttrs, _?: string) => Promise<{
    success: boolean;
    error: string;
  }>;
  initialData: Project;
  id: string;
}
