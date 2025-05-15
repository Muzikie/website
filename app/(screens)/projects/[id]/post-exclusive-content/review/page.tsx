'use server'

import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import PostContentsReview from '@/app/components/Forms/ExclusiveContents/Review';

const PostContentReviewScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;

  return (
    <SafeArea>
      <PostContentsReview projectId={projectId} />
    </SafeArea>
  );
};

export default PostContentReviewScreen;
