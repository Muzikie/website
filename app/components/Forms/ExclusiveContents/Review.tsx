'use client'

import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import {ExclusiveContentAttrs} from '@/app/components/Feed/types';
import {View, ScrollView} from '@/app/components/Polyfills';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import SectionHeader from '@/app/components/SectionHeader';
import {Button} from '@/app/components/Elements';
import Feedback from '@/app/components/Feedback';
import type {PostExclusiveContentsReviewProps} from './types';
import {Routes} from '@/app/config/routes';
import {postExclusiveContent} from '@/app/actions/postExclusiveContent';

const PostExclusiveContentsReview: FC<PostExclusiveContentsReviewProps> = ({
  projectId, 
}) => {
  const {push} = useRouter();
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: ''
  });
  const [data, setData] = useState<ExclusiveContentAttrs>({
    media: null,
    project: '',
    public_access: false,
    accessible_tiers: [],
    title: '',
    description: '',
  });

  const handleSubmit = async () => {
    try {
      console.log('Submitting', {
        ...data,
        accessible_tiers: data.accessible_tiers.filter(item => item.selected).map(item => item.id)
      });
      const res = await postExclusiveContent({
        ...data,
        accessible_tiers: data.accessible_tiers.filter(item => item.selected).map(item => item.id)
      });
      console.log('res', res);
      setFeedback({
        status: FetchStatus.Success,
        message: ''
      });
    } catch (e) {
      setFeedback({
        status: FetchStatus.Error,
        message: 'Error posting exclusive content'
      });
      console.error('Error posting exclusive content:', e);
    }
  };

  const handleEdit = () => {
    push(`${Routes.Projects}/${projectId}/post-exclusive-content`);
  }

  useEffect(() => {
    try {
      const storedData = localStorage.getItem('exclusiveContent') || '';
      console.log('storedData', storedData);
      const parsedData = JSON.parse(storedData) as ExclusiveContentAttrs;
      setData(parsedData);
    } catch (error) {
      console.log(`Error reading form data, ${error}`);
    }
  }, []);

  console.log('----- data', data);

  const formattedValue = {
    title: data.title,
    description: data.description,
    accessibleTiers: data.accessible_tiers
      .filter(item => item.selected)
      .map(item => item.name)
      .join(', ')
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

export default PostExclusiveContentsReview;
