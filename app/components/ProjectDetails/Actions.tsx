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

  const ownerId = Number(project.users_permissions_user.id);
  const accountId = account?.id;
  const projectId = project?.documentId;
  const status = project?.project_status;
  const deadline = project.deadline;

  const editable = ownerId === accountId && status === ProjectStatus.Draft;

  const published =
    new Date(deadline) > new Date() &&
    (status === ProjectStatus.Published || status === ProjectStatus.Successful);

  const succeeded =
    new Date(deadline) <= new Date() &&
    (status === ProjectStatus.Successful || status === ProjectStatus.soldOut);

  const failing = (
    new Date(deadline) <= new Date() && status !== ProjectStatus.Successful && status !== ProjectStatus.soldOut
  ) || status === ProjectStatus.Failing;

  return (
    <View>
      {editable && <EditProject projectId={projectId} refresh={refresh} />}

      {published && ownerId === accountId ? (
        <PublishedProjectOwner
          project={project}
          account={account!}
          artist={owner}
        />
      ) : null}

      {published && ownerId !== accountId ? (
        <SupportProject
          project={project}
          account={account!}
          artist={owner}
          refresh={refresh}
        />
      ) : null}

      {succeeded && ownerId === accountId ? (
        <SuccessfulProjectOwner projectId={projectId} onChainId={project.on_chain_id} />
      ) : null}

      {succeeded && ownerId !== accountId ? (
        <SuccessfulProjectContributor />
      ) : null}

      {failing ? <FailingProjectOwner /> : null}
    </View>
  );
};

export default Actions;
