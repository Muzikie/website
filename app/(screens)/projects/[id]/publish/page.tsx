import React, {FC} from 'react';

import {Params, SupportedTokens} from '@/app/config/types';
import {SafeArea} from '@/app/components/Elements';
import PublishProject from '@/app/components/PublishProject';
import {getProjectDetails} from '@/app/actions/getProjectDetails';
import {getProjectContributionTier} from '@/app/actions/getProjectContributionTiers';
import {formatAmount} from '@/app/utils/formatters';

interface Item {name: string; amount: number, rewards: string}
type Acc = Record<string, {name: string; amount: string, rewards: string}>

const ProjectPublishScreen: FC<{params: Params<{id: string}>}> = async ({params}) => {
  const awaitedParams = await params;
  const projectId = awaitedParams.id;
  const {artist, project} = await getProjectDetails(projectId);
  const contributionTiers = await getProjectContributionTier(projectId);

  const tiers = contributionTiers.reduce((acc: Acc, item: Item, index: number) => {
    acc[`contribution_tier_#${index + 1}`] = {
      name: item.name,
      rewards: item.rewards,
      amount: formatAmount(item.amount, SupportedTokens.USDC),
    };
    return acc;
  }, {});

  const data = {
    project_name: project.name,
    project_summary: project.summary,
    artist_name: [artist.first_name, artist.last_name].join(' '),
    ...tiers,
  };

  return (
    <SafeArea>
      <PublishProject
        data={data}
        projectId={projectId}
        onchainId={project.on_chain_id}
      />
    </SafeArea>
  );
};

export default ProjectPublishScreen;
