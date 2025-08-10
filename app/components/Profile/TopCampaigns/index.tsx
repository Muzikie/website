'use server';

import React, {FC} from 'react';

import {BoxTitle} from '@/app/components/Profile/BoxTitle';
import { getSmallestSize } from '@/app/utils/image';
import {Image} from '@/app/components/Polyfills';
import {Project} from '@/app/components/Feed/types';

const Campaign: FC<{data: Project}> = ({data}) => {
  const {name, images} = data;
  const thumbnail = getSmallestSize(images[0].formats);

  return (
    <div className="w-[120px] h-[120px] rounded-[60px] overflow-hidden">
      <Image
        key={thumbnail.src}
        alt={name}
        source ={thumbnail.src}
        width={thumbnail.width}
        height={thumbnail.height}
        className="min-w-[120px] min-h-[120px]"
      />
    </div>
  );
};

const EmptyState = () => (
  <div className="overflow-hidden w-full h-full bg-[url(/images/artist-enjoying.png)] bg-no-repeat bg-contain bg-right-bottom" />
);

export const TopCampaigns: FC<{data: Project[]}> = async ({data = []}) => (
  <section className="bg-skyPale w-full h-[280px] rounded-[32px] p-6">
    <BoxTitle>Top Campaigns</BoxTitle>
    {
      data.length ? (
        <main className="h-full flex items-end grow shrink-0 border-box pb-6">
          {
            data.filter((item: Project) => item.images?.length > 0).map((item: Project) => (
              <Campaign data={item} key={item.documentId} />
            ))
          }
        </main>
      ) : <EmptyState />
    }
  </section>
);
