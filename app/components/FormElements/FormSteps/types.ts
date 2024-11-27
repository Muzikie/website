import {ElementType} from 'react';

export enum FormStep {
  Form = 'form',
  Review = 'review',
}

export interface FormStepsProps {
  Form: ElementType;
  Review: ElementType;
  submit: (data: Record<string, unknown>, _?: number) => Promise<{
    success: boolean;
    error: string;
  }>;
  initialData: {
    id: number;
    attributes: unknown;
  }
}
