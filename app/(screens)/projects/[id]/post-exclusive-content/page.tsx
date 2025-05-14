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
  const initialData = {
    title: '',
    description: '',
    accessible_tiers: project.project.contribution_tiers,
  };

  return (
    <SafeArea>
      <PostContentsForm projectId={projectId} initialData={initialData} />
    </SafeArea>
  );
};

export default PostContentScreen;
