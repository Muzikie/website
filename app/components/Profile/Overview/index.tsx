'use server'

import React, {FC} from 'react';
import {View} from '@/app/components/Polyfills';
import {AboutMe} from '@/app/components/Profile/AboutMe';
import {Badges} from '@/app/components/Profile/Badges';
import {TotalContributions} from '@/app/components/Profile/TotalContributions';
import {getUserAccount} from '@/app/actions/getUserAccount';
import {getContributionsOverview} from '@/app/actions/getContributionsOverview';

export const Overview: FC = async () => {
  const account = await getUserAccount();
  const contributionsOverview = await getContributionsOverview();

  return (
    <View className="md:flex md:flex-row md:flex-nowrap gap-6">
      <div className="basis-1/2 lg:basis-1/3 flex flex-col flex-nowrap gap-y-6">
        <div>
          <AboutMe data={account} />
        </div>
        <div className="w-full lg:hidden"><Badges achievedBadges={[]} /></div>
        <div><TotalContributions amount={contributionsOverview.total_contributions_amount} /></div>
      </div>
      <div className="basis-1/2 lg:basis-2/3 flex flex-col lg:flex-row flex-nowrap lg:flex-wrap gap-y-6">
        <div className=" w-full hidden lg:block"><Badges achievedBadges={[]} /></div>
        <div className="lg:basis-1/2"><div className="h-[384px] bg-[#00f]">Box 3</div></div>
        <div className="lg:basis-1/2"><div className="h-[384px] bg-[#0ff]">Box 4</div></div>
        <div className="lg:basis-2/5"><div className="h-[241px] bg-[#f0f]">Box 6</div></div>
        <div className="lg:basis-3/5"><div className="h-[241px] bg-[#aaa]">Box 7</div></div>
      </div>
    </View>
  );
};
