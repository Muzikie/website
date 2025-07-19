'use client';

import React from 'react';

import {BoxTitle} from '@/app/components/Profile/BoxTitle';

export const Activity = () => {
  const data = [
    {name: 'likes', value: 124},
    {name: 'supports', value: 4},
    {name: 'reach', value: 641},
  ];
  return (
    <section className="bg-coffeeSoft w-full h-[365px] rounded-[32px] p-6 bg-[url(/images/pattern.svg)] bg-no-repeat bg-center flex flex-col">
      <BoxTitle className="!text-neutralPure">Activity</BoxTitle>
      <main className="flex flex-row gap-4 items-center grow shrink-0">
        {
          data.map((item) => (
            <div key={item.name} className="grow text-center bg-[url(/images/green-stripes.svg)] rounded-[12px]">
              <span className="pb-10 pt-10 block font-martian text-4xl text-neutralPure">{item.value}</span>
              <h4 className="font-martian text-xs font-light text-neutralPale uppercase pb-4">{item.name}</h4>
            </div>
          ))
        }
      </main>
    </section>
  );
};
