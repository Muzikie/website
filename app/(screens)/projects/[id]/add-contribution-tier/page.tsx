import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import FormSteps from '@/app/components/FormElements/FormSteps';
import Form from '@/app/components/Forms/ContributionTier/Create';
import Review from '@/app/components/Forms/ContributionTier/Create/Review';
import {addContributionTier} from '@/app/actions/addContributionTier';

const AddContributionTierScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  return (
    <SafeArea>
      <FormSteps
        Form={Form}
        Review={Review}
        submit={addContributionTier}
        id={{projectId}}
      />
    </SafeArea>
  );
};

export default AddContributionTierScreen;
