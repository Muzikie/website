import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import FormSteps from '@/app/components/FormElements/FormSteps';
import Form from '@/app/components/Forms/Project/Edit';
import Review from '@/app/components/Forms/Project/Edit/Review';
import {editProject} from '@/app/actions/editProject';
import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {fromBaseToken} from '@/app/utils/formatters';

const ProjectEditScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const result = await getProjectDetails(awaitedParams.id);
  const initialData = {
    deadline: result.project?.deadline ?? '',
    description: result.project?.description ?? '',
    hard_goal: fromBaseToken(result.project?.hard_goal ?? '0', 4),
    name: result.project?.name ?? '',
    planned_release_date: result.project?.planned_release_date ?? '',
    publishedAt: result.project?.publishedAt ?? '',
    soft_goal: fromBaseToken(result.project?.soft_goal ?? '0', 4),
    summary: result.project?.summary ?? '',
  };
  const projectId = awaitedParams.id;

  return (
    <SafeArea>
      <FormSteps
        Form={Form}
        Review={Review}
        submit={editProject}
        initialData={initialData}
        id={{projectId}}
      />
    </SafeArea>
  );
};

export default ProjectEditScreen;
