import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import CreateContributionTier from '@/app/components/Forms/ContributionTier/Create';

const AddContributionTierScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;

  return (
    <SafeArea>
      <CreateContributionTier projectId={projectId}/>
    </SafeArea>
  );
};

export default AddContributionTierScreen;
