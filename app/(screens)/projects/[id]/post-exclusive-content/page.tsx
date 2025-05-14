import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import FormSteps from '@/app/components/FormElements/FormSteps';
import {SafeArea} from '@/app/components/Elements';
import PostExclusiveContentsForm from '@/app/components/Forms/ExclusiveContents/create';
import PostExclusiveContentsReview from '@/app/components/Forms/ExclusiveContents/create/Review';

const PostExclusiveContentScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const editProject = async () => {
    'use server'
  };

  return (
    <SafeArea>
      <FormSteps
        Form={PostExclusiveContentsForm}
        Review={PostExclusiveContentsReview}
        submit={editProject}
        id={{projectId}}
      />
    </SafeArea>
  );
};

export default PostExclusiveContentScreen;
