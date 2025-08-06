'use server'
import React, {FC} from 'react';

import {getFeed} from '@/app/actions/getFeed';
import {SafeArea} from '@/app/components/Elements';
import {View} from '@/app/components/Polyfills'
import CreateProjectLink from '@/app/components/CreateProjectLink';
import Feed from '@/app/components/Feed';
import {InfoBanner} from '@/app/components/InfoBanner';
import {FeedBanner} from '@/app/components/InfoBanner/CustomBanners/FeedBanner';

const FeedScreen: FC = async () => {
  const data = await getFeed();

  return (
    <SafeArea>
      <View className="px-6">
        <InfoBanner id="feed-v1">
          <FeedBanner />
        </InfoBanner>
      </View>
      <Feed data={data} />
      <CreateProjectLink />
    </SafeArea>
  );
};


export default FeedScreen;
