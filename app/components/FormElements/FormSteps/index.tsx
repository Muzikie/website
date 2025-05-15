'use client'

import React, {FC, useState} from 'react';

import {FormStep, FormStepsProps} from './types';
import {FetchStatus} from '@/app/config/types';
import {Project} from '@/app/components/Projects/types';

const FormSteps: FC<FormStepsProps> = ({Form, Review, submit, initialData, id}) => {
  const [step, setStep] = useState<FormStep>(FormStep.Form);
  const [formData, setFormData] = useState<Project>(initialData);
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: ','
  });

  const handleProceed = (data: Project) => {
    setFormData(data);
    setStep(FormStep.Review);  // Go to summary step
  };

  const handleEdit = () => {
    setStep(FormStep.Form);  // Go back to form step
  };

  const handleSubmit = async(data: Project, id?: string) => {
    setFeedback({
      status: FetchStatus.Pending,
      message: ','
    });
    const result = await submit(data, id);
    setFeedback({
      status: result.success ? FetchStatus.Success : FetchStatus.Error,
      message: result.error,
    });
  };

  return (
    <>
      {step === FormStep.Form ? (
        <Form initialData={formData} onProceed={handleProceed} {...id} />
      ) : (
        <Review data={formData} onEdit={handleEdit} onSubmit={handleSubmit} feedback={feedback} {...id} />
      )}
    </>
  );
};

export default FormSteps;
