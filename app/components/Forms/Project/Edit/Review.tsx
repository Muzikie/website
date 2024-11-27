'use client'

import React, {FC} from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {FetchStatus} from '@/app/config/types';
import {toBaseToken} from '@/app/utils/formatters';
import SectionHeader from '@/app/components/SectionHeader';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import Feedback from '@/app/components/Feedback';
import type {EditProjectReviewProps} from './types';

const SubmitTitle = {
  [FetchStatus.Idle]: 'Submit',
  [FetchStatus.Pending]: 'Submitting',
  [FetchStatus.Error]: 'Failed',
  [FetchStatus.Success]: 'Succeeded',
};

const CreateProjectReview: FC<EditProjectReviewProps> = ({
  data, onEdit, onSubmit, feedback, projectId,
}) => {
  const handleSubmit = async () => {
    try {
      await onSubmit({
        ...data,
        soft_goal: toBaseToken(data?.soft_goal ?? ''),
        hard_goal: toBaseToken(data?.hard_goal ?? ''),
      }, projectId);
    } catch (e) {
      console.error('Error editing project:', e);
    }
  };

  const formattedValue = {
    ...data,
    soft_goal: `${data?.soft_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
    hard_goal: `${data?.hard_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title="Almost there"
        subtitle="Review the details and submit"
      />
      <FormSummary data={formattedValue} />
      <View className="flex flex-row justify-center gap-4">
        <Button
          title={'Edit'}
          theme={ButtonThemes.secondary}
          onPress={onEdit}
        />
        <Button
          title={SubmitTitle[feedback.status]}
          theme={ButtonThemes.primary}
          disabled={feedback.status !== FetchStatus.Idle}
          onPress={handleSubmit}
        />
      </View>
      <Feedback {...feedback} />
    </ScrollView>
  );
};

export default CreateProjectReview;
