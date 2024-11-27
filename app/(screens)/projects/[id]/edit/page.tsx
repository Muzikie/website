import React, {FC} from 'react';

import {Params} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import FormSteps from '@/app/components/FormElements/FormSteps';
import Form from '@/app/components/Forms/Project/Edit';
import Review from '@/app/components/Forms/Project/Edit/Review';
import {editProject} from '@/app/actions/editProject';
import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {fromBaseToken} from '@/app/utils/formatters';

const ProjectEditScreen: FC<{params: Params<{id: number}>}> = async ({params}) => {
  const awaitedParams = await params;
  const result = await getProjectDetails(awaitedParams.id);
  const initialData = {
    deadline: result.project.attributes?.deadline ?? '',
    description: result.project.attributes?.description ?? '',
    hard_goal: fromBaseToken(result.project.attributes?.hard_goal ?? '0', 4),
    name: result.project.attributes?.name ?? '',
    planned_release_date: result.project.attributes?.planned_release_date ?? '',
    publishedAt: result.project.attributes?.publishedAt ?? '',
    soft_goal: fromBaseToken(result.project.attributes?.soft_goal ?? '0', 4),
    summary: result.project.attributes?.summary ?? '',
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
