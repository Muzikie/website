import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import Contribute from '@/app/components/Forms/Project/Contribute';
import {getProjectContributionTier} from '@/app/actions/getProjectContributionTiers';
import {getProjectDetails} from '@/app/actions/getProjectDetails';

const AddContributionTierScreen: FC<{params: Params<{id: number}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const options = await getProjectContributionTier(projectId);
  const {artist, project} = await getProjectDetails(projectId);

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
