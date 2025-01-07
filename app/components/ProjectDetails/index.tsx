import React, {FC} from 'react';

import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {ScrollView, H2, H3, Span, View} from '@/app/components/Polyfills';
import Gallery from '@/app/components/ProjectGallery';
import Deadline from './Deadline';
import Artist from './Artist';
import NotFound from '../NotFound/Screen';
import FundingProgress from './FundingProgress';
import Actions from './Actions';
import {ProjectDetailsProps} from './types';



const ProjectDetails: FC<ProjectDetailsProps> = async ({projectId}) => {
  let {artist, project} = await getProjectDetails(projectId);

  const refresh = async () => {
    'use server'
    const result = await getProjectDetails(projectId);
    artist = result.artist;
    project = result.project;
  };

  if (projectId && project.documentId != projectId) {
    return <NotFound />;
  }

  return (
    <ScrollView>
      <Gallery
        images={project.images || []}
        id={project.documentId}
        projectStatus={project.project_status}
        ownerId={project.users_permissions_user?.id}
        refresh={refresh}
      />
      <View className="p-4">
        <H2 className="dark:!text-primaryStrong">
          {project.name}
        </H2>
        <Span className="mb-4 !font-light dark:!text-neutralStrong">
          {project.summary}
        </Span>
        <Deadline date={project.deadline} />
        <Span className="!font-light dark:!text-neutralStrong">{project.description}</Span>
        <Artist data={artist} />
        <H3 className="!font-light pt-4 pb-6 dark:!text-neutralStrong">
          By supporting her, you are not just funding the music—you are becoming a
          part of the creative journey!
        </H3>
        <FundingProgress
          currentFunding={project.current_funding}
          softGoal={project.soft_goal}
          hardGoal={project.hard_goal}
        />
        <Actions
          project={project}
          owner={artist}
          refresh={refresh}
        />
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;
