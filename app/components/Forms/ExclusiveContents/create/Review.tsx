'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import {View} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {usePostData} from '@/app/hooks/useQuery';
import {FetchStatus} from '@/app/config/types';
import {finalMessages} from '@/app/utils/modal';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {ENDPOINTS} from '@/app/config/endpoints';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import type {PostExclusiveContentsReviewProps, Feedback} from './types';

const PostExclusiveContentsReview: FC<PostExclusiveContentsReviewProps> = ({
  data,
}) => {
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mutation = usePostData(ENDPOINTS.EXCLUSIVE_CONTENT);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    Keyboard.dismiss();
    try {
      await mutation.mutateAsync({
        data: {
          title: data.title,
          description: data.description,
          accessible_tiers: data.accessible_tiers.map(item => item.id),
          public_access: false, // Let's keep exclusive for now.
        },
      });
    } catch (e) {
      console.error('Error creating exclusive content:', e);
    }
  };

  useEffect(() => {
    if (!mutation.isLoading && (mutation.isError || mutation.isSuccess)) {
      onDone({
        status: mutation.isSuccess ? FetchStatus.success : FetchStatus.error,
        message: mutation.isSuccess ? '' : 'Error creating your project.',
      });
    }
  }, [mutation, onDone]);

  const previewData = {
    title: data.title,
    description: data.description,
    accessible_to_tiers: data.accessible_tiers
      .map(item => item.name)
      .join(', '),
  };

  return (
    <View>
      <FormSummary data={previewData} />
      <View>
        <Button
          title={isSubmitted ? 'Updating' : 'Create'}
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={isSubmitted}
        />
      </View>
    </View>
  );
};

export default PostExclusiveContentsReview;
