'use server'

import React, {FC} from 'react';

import {View} from '@/app/components/Polyfills';
import {
  EditProject,
  SupportProject,
  SuccessfulProjectOwner,
  FailingProjectOwner,
  SuccessfulProjectContributor,
  PublishedProjectOwner,
} from '../ProjectStatus';
import {getUserAccount} from '@/app/actions/getUserAccount';
import {ProjectStatus} from '../Projects/types';
import {ActionsProps} from './types';

const Actions: FC<ActionsProps> = async ({owner, project, refresh}) => {
  const account = await getUserAccount();
  const projectId = project?.documentId;
  const status = project?.project_status;
  const isPastDeadline = new Date(project.deadline) < new Date();
  const isOwner = Number(project.users_permissions_user?.id) === account?.id;
  const editable = isOwner && status === ProjectStatus.Draft && !isPastDeadline;

  const published =
    !isPastDeadline &&
    (status === ProjectStatus.Published || status === ProjectStatus.Successful);

  const succeeded =
    isPastDeadline &&
    (status === ProjectStatus.Successful || status === ProjectStatus.soldOut);

  const failing = (
    isPastDeadline && status !== ProjectStatus.Successful && status !== ProjectStatus.soldOut
  ) || status === ProjectStatus.Failing;

  return (
    <View>
      {editable && <EditProject projectId={projectId} refresh={refresh} />}

      {published && isOwner ? (
        <PublishedProjectOwner
          project={project}
          account={account!}
          artist={owner}
        />
      ) : null}

      {published && !isOwner ? (
        <SupportProject
          project={project}
          account={account!}
          artist={owner}
          refresh={refresh}
        />
      ) : null}

      {succeeded && isOwner ? (
        <SuccessfulProjectOwner projectId={projectId} onChainId={project.on_chain_id} />
      ) : null}

      {succeeded && !isOwner ? (
        <SuccessfulProjectContributor />
      ) : null}

      {failing ? <FailingProjectOwner /> : null}
    </View>
  );
};

export default Actions;
