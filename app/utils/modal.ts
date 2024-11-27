import {FetchStatus} from '@/app/config/types';
import successImage from '@/public/images/success.svg';
import errorImage from '@/public/images/error.svg';
import {Feedback, FeedbackFnReturn} from './types';

export const finalMessages = (feedback: Feedback):FeedbackFnReturn  => {
  if (feedback.status === FetchStatus.Success) {
    return {
      title: 'Success!',
      description: feedback.message ?? 'That was successful.',
      image: successImage,
    };
  }
  return {
    title: 'Error!',
    description: feedback.message || 'Something went wrong.',
    image: errorImage,
  };
};
