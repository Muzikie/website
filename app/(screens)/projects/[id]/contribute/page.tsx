import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import Contribute from '@/app/components/Forms/Project/Contribute';
import {getProjectContributionTier} from '@/app/actions/getProjectContributionTiers';
import {getProjectDetails} from '@/app/actions/getProjectDetails';

const AddContributionTierScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const {artist, project} = await getProjectDetails(projectId);
  const options = await getProjectContributionTier(projectId);

  return (
    <SafeArea>
      <Contribute
        artist={artist}
        project={project}
        options={options}
      />
    </SafeArea>
  );
};

export default AddContributionTierScreen;
