import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import ProjectDetails from '@/app/components/ProjectDetails';

const ProjectDetailsScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;

  return (
    <SafeArea safeArea>
      <ProjectDetails projectId={awaitedParams.id} />
    </SafeArea>
  );
}

export default ProjectDetailsScreen;
