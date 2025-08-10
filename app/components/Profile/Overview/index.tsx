'use server'

import React, {FC} from 'react';
import {View} from '@/app/components/Polyfills';
import {AboutMe} from '@/app/components/Profile/AboutMe';
import {Badges} from '@/app/components/Profile/Badges';
import {TotalContributions} from '@/app/components/Profile/TotalContributions';
import {Wallet} from '@/app/components/Profile/Wallet';
import {Socials} from '@/app/components/Profile/Socials';
import {Activity} from '@/app/components/Profile/Activity';
import {TopCampaigns} from '@/app/components/Profile/TopCampaigns';
import {getUserAccount} from '@/app/actions/getUserAccount';
import {getUserCampaigns} from '@/app/actions/getUserCampaigns';
import {getProfileActivity} from '@/app/actions/getProfileActivity';
import {getContributionsOverview} from '@/app/actions/getContributionsOverview';

export const Overview: FC = async () => {
  const account = await getUserAccount();
  const contributionsOverview = await getContributionsOverview();
  const {data: campaigns} = await getUserCampaigns({max: 4, userId: account.id});
  const {data: activity} = await getProfileActivity(account.id);

  return (
    <View className="md:flex md:flex-row md:flex-nowrap gap-6">
      <div className="basis-1/2 lg:basis-1/3 flex flex-col flex-nowrap gap-y-6">
        <div>
          <AboutMe data={account} />
        </div>
        <div className="w-full lg:hidden"><Badges achievedBadges={[]} /></div>
        <div><TotalContributions amount={contributionsOverview.total_contributions_amount} /></div>
      </div>
      <div className="basis-1/2 lg:basis-2/3 flex flex-col lg:flex-row flex-nowrap lg:flex-wrap gap-y-6 pt-6 md:pt-0">
        <div className=" w-full hidden lg:block"><Badges achievedBadges={[]} /></div>
        <div className="lg:basis-1/2"><Wallet /></div>
        <div className="lg:basis-1/2"><Activity data={activity} /></div>
        <div className="lg:basis-2/5"><Socials profileId={account.profileId} socials={account.socials} /></div>
        <div className="lg:basis-3/5"><TopCampaigns data={campaigns} /></div>
      </div>
    </View>
  );
};
