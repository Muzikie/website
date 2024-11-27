import React, {useCallback, useState} from 'react';
import {View} from '@/app/components/Polyfills';

import {useAccount} from '@/app/hooks/useAccount';
import {useModal} from '@/app/hooks/useModal';
import {FetchStatus} from '@/app/config/types';
import {finalMessages} from '@/app/utils/modal';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import type {ProfileEditReviewProps, Feedback} from './types';

const EditProfileReview = ({data}: ProfileEditReviewProps) => {
  const {update} = useAccount();
  const {show} = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onDone = useCallback(
    (feedback: Feedback) => {
      show(finalMessages(feedback));
    },
    [show],
  );

  const onSubmit = async () => {
    setIsSubmitted(true);
    // Keyboard.dismiss();
    const response = await update(data);
    onDone({
      status: response.success ? FetchStatus.Success : FetchStatus.Error,
      message: response.success ? '' : 'Error updating your profile.',
    });
  };

  return (
    <View>
      <FormSummary data={data} />
      <View>
        <Button
          title={isSubmitted ? 'Updating' : 'Continue'}
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={isSubmitted}
        />
      </View>
    </View>
  );
};

export default EditProfileReview;
