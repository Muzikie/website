'use client';

import React, {FC} from 'react';
import NextImage from 'next/image';

import {BadgeAttrs, BadgesAttrs, PointsAttrs} from '../types';
import {BoxTitle} from '@/app/components/Profile/BoxTitle';
import dayBadge from '@/public/images/badges/dayBadge.svg';
import weekBadge from '@/public/images/badges/weekBadge.svg';
import monthBadge from '@/public/images/badges/monthBadge.svg';

const availableBadges: Record<string, string> = {
  campaignStarter: dayBadge,
  socialStar: weekBadge,
  fanFavorite: monthBadge,
  milestoneMaster: dayBadge,
  goalGetter: weekBadge,
  backstagePass: monthBadge,
  encoreSupporter: dayBadge,
  risingStar: weekBadge,
  mentorMedal: monthBadge,
  viralSensation: dayBadge,
  earlyBird: weekBadge,
  communityBuilder: monthBadge,
  creativeCollaborator: dayBadge,
  topContributor: weekBadge,
  legacyLegend: monthBadge,
};

export const Badge: FC<BadgeAttrs> = ({name, isActive}) => (
  <NextImage
    src={availableBadges[name]}
    alt={`${name} Badge`}
    width={90}
    height={90}
    className={`${isActive ? '' : 'grayscale opacity-40'}`}
  />
);

export const Points : FC<PointsAttrs> = ({points}) => (
  <h3 className="bg-neutralMighty text-neutralPure font-poppins text-xs uppercase rounded-md p-2">{`${points} Points`}</h3>
);

export const Badges: FC <BadgesAttrs>= ({achievedBadges}) => (
  <section className="bg-neutralPure w-full h-[220px] rounded-[32px] p-6 border-box">
    <div className="w-full h-full overflow-hidden flex flex-col flex-nowrap">
      <header className="flex flex-row flex-nowrap justify-between items-center">
        <BoxTitle>Badges</BoxTitle>
        <Points points={0} />
      </header>
      <main className="flex items-center grow shrink-0">
        <div className="overflow-x-scroll flex flex-row flex-nowrap gap-8 h-full">
          {
            Object.keys(availableBadges).map(name => <Badge key={name} name={name} isActive={achievedBadges.includes(name)} />)
          }
        </div>
      </main>
    </div>
  </section>
);
