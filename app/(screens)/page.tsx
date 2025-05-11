'use server'
import React, {FC} from 'react';

import {getFeed} from '@/app/actions/getFeed';
import {SafeArea} from '@/app/components/Elements';
import CreateProjectLink from '@/app/components/CreateProjectLink';
import Feed from '@/app/components/Feed';

const FeedScreen: FC = async () => {
  const data = await getFeed();

  return (
    <SafeArea>
      <Feed data={data} />
      <CreateProjectLink />
    </SafeArea>
  );
};


export default FeedScreen;
