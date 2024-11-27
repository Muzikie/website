import React from 'react';
import {Span, View} from '@/app/components/Polyfills';
import {FeedbackProps} from './types';
import {FetchStatus} from '@/app/config/types';

const messages = {
  [FetchStatus.Idle]: '',
  [FetchStatus.Pending]: '',
  [FetchStatus.Success]: 'That was successful!',
  [FetchStatus.Error]: 'Oops, try again later.',
};

const Feedback = ({status, message}: FeedbackProps) => {
  return (
    <View className="pt-4 pb-6">
      <Span className={`text-${status === FetchStatus.Success ? 'assureStrong' : 'warnStrong'}`}>
        {message || messages[status]}
      </Span>
    </View>
  );
};

export default Feedback;
