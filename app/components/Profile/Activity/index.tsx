'use client';

import React, {FC} from 'react';

import {BoxTitle} from '@/app/components/Profile/BoxTitle';
import {ActivityAttrs} from '../types';

const TITLES: Record<string, string> = {
  likesCount: 'Likes',
  projectsCount: 'Projects',
  reachCount: 'Reach',
};

export const Activity: FC<ActivityAttrs> = ({data}) => {
  return (
    <section className="bg-coffeeSoft w-full h-[365px] rounded-[32px] p-6 bg-[url(/images/pattern.svg)] bg-no-repeat bg-center flex flex-col">
      <BoxTitle className="!text-neutralPure">Activity</BoxTitle>
      <main className="flex flex-row gap-4 items-center grow shrink-0">
        {
          (Object.entries(data) as [string, number][]).map(([name, value]) => (
            <div key={name} className="grow text-center bg-[url(/images/green-stripes.svg)] rounded-[12px]">
              <span className="pb-10 pt-10 block font-martian text-4xl text-neutralPure">{value}</span>
              <h4 className="font-martian text-xs font-light text-neutralPale uppercase pb-4">{TITLES[name]}</h4>
            </div>
          ))
        }
      </main>
    </section>
  );
};
