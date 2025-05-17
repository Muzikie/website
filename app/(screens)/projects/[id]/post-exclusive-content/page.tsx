'use server'

import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import {getProjectDetails} from '@/app/actions/getProjectDetails';
import PostContentsForm from '@/app/components/Forms/ExclusiveContents/create';

const PostContentScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const project = await getProjectDetails(projectId);

  return (
    <SafeArea>
      <PostContentsForm
        projectId={projectId}
        contributionTiers={project.project.contribution_tiers}
      />
    </SafeArea>
  );
};

export default PostContentScreen;
