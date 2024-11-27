'use server'
import React, {FC} from 'react';

import {Routes} from '@/app/config/routes';
import {getFeed} from '@/app/actions/getFeed';
import {Span, Link, View} from '../components/Polyfills';
import {SafeArea, Icon} from '@/app/components/Elements';
import Feed from '@/app/components/Feed';

const FeedScreen: FC = async () => {
  const data = await getFeed();

  return (
    <SafeArea>
      <Feed data={data} />
      <Link
        to={{screen: Routes.CreateProjects}}
        className="absolute right-8 bottom-8 rounded-3xl bg-neutralPure border-assureStrong p-2 shadow-lg hover:shadow-xl cursor-pointer"
      >
        <View className="flex flex-row no-wrap">
          <Span className="text-neutralStrong !font-light">Create a campaign</Span>
          <Icon
            name="plus"
            size={28}
            color="#3D3D3D"
          />
        </View>
      </Link>
    </SafeArea>
  );
};


export default FeedScreen;
