'use server'

import React, {FC} from 'react';
import {View} from '@/app/components/Polyfills';
import {AboutMe} from '@/app/components/Profile/AboutMe';
import {getUserAccount} from '@/app/actions/getUserAccount';

export const Overview: FC = async () => {
  const account = await getUserAccount();

  return (
    <View className="md:flex md:flex-row md:flex-nowrap">
      <div className="basis-1/2 lg:basis-1/3">
        <div>
          <AboutMe data={account} />
        </div>
        <div className="w-full lg:hidden"><div className="h-[222px] bg-[#0f0]">Box 2</div></div>
        <div><div className="h-[204px] bg-[#ff0]">Box 5</div></div>
      </div>
      <div className="basis-1/2 lg:basis-2/3 flex flex-col lg:flex-row flex-nowrap lg:flex-wrap">
        <div className=" w-full hidden lg:block"><div className="h-[222px] bg-[#0f0]">Box 2</div></div>
        <div className="lg:basis-1/2"><div className="h-[384px] bg-[#00f]">Box 3</div></div>
        <div className="lg:basis-1/2"><div className="h-[384px] bg-[#0ff]">Box 4</div></div>
        <div className="lg:basis-2/5"><div className="h-[241px] bg-[#f0f]">Box 6</div></div>
        <div className="lg:basis-3/5"><div className="h-[241px] bg-[#aaa]">Box 7</div></div>
      </div>
    </View>
  );
};
