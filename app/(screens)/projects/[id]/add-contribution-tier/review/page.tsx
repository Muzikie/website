'use server'

import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import CreateTierReview from '@/app/components/Forms/ContributionTier/Review';

const CreateTierReviewScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;

  return (
    <SafeArea>
      <CreateTierReview projectId={projectId} />
    </SafeArea>
  );
};

export default CreateTierReviewScreen;
