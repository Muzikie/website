'use server'

import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import PostExclusiveContentsReview from '@/app/components/Forms/ExclusiveContents/Review';

const PostExclusiveContentScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;

  return (
    <SafeArea>
      <PostExclusiveContentsReview
        projectId={projectId}
      />
    </SafeArea>
  );
};

export default PostExclusiveContentScreen;
