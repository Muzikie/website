'use client'

import React from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {toBaseToken} from '@/app/utils/formatters';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import Feedback from '@/app/components/Feedback';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import type {CreateContributionTierReviewProps} from './types';

const CreateProjectReview = ({
  data, onEdit, onSubmit, feedback, projectId,
}: CreateContributionTierReviewProps) => {
  const handleSubmit = async () => {
    try {
      await onSubmit({
        ...data,
        project: projectId,
        amount: Number(toBaseToken(data?.amount ?? '')),
      });
    } catch (e) {
      console.error('Error creating project:', e);
    }
  };

  const formattedValue = {
    ...data,
    amount: `${data.amount} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <ScrollView className="w-full h-full p-4">
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
