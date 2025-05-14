'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import {View, ScrollView} from '@/app/components/Polyfills';
import {toBaseToken} from '@/app/utils/formatters';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import Feedback from '@/app/components/Feedback';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import type {CreateContributionTierReviewProps} from './types';
import {addContributionTier} from '@/app/actions/addContributionTier';
import type {ContributionTierForm} from '@/app/components/Feed/types';
import {Routes} from '@/app/config/routes';

const CreateTierReview = ({projectId}: CreateContributionTierReviewProps) => {
  const {push} = useRouter();
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: '',
  });
  const [data, setData] = useState<ContributionTierForm>({
    name: '',
    description: '',
    rewards: '',
    amount: 0,
    project: projectId,
  });

  const handleSubmit = async () => {
    try {
      const res = await addContributionTier({
        ...data,
        project: projectId,
        amount: Number(toBaseToken(data?.amount ?? '')),
      });
      if (!res.success) {
        throw new Error(res.error);
      }

      setFeedback({
        status: FetchStatus.Success,
        message: ''
      });
    } catch (e) {
      setFeedback({
        status: FetchStatus.Error,
        message: 'Error posting exclusive content'
      });
      console.error('Error creating project:', e);
    }
  };

  const handleEdit = () => {
    push(`${Routes.Projects}/${projectId}/post-exclusive-content`);
  };

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('formData') || '';
      console.log('storedData', storedData);
      const parsedData = JSON.parse(storedData) as ContributionTierForm;
      setData(parsedData);
    } catch (error) {
      console.log(`Error reading form data, ${error}`);
    }
  }, []);

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
          onPress={handleEdit}
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

export default CreateTierReview;
