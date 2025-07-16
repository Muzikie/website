'use client'

import React, {FC} from 'react';
import NextImage from 'next/image';

import {TotalContributionsAttrs} from '../types';
import {SupportedTokens} from '@/app/config/types';
import {showBalance} from '@/app/utils/formatters';
import {BoxTitle} from '../BoxTitle';
import hand from '@/public/images/hand.png';

export const TotalContributions: FC<TotalContributionsAttrs> = ({amount}) => (
  <section className="bg-neutralPure w-full h-[290px] rounded-[32px] pt-12 pl-10 border-box relative overflow-hidden">
    <div className="flex flex-row flex-nowrap gap-2 items-baseline font-semibold">
      <h3 className="font-martian text-6xl">{showBalance(amount)}</h3>
      <span className="font-martian font-light text-lg">{SupportedTokens.USDC}</span>
    </div>
    <BoxTitle className="absolute bottom-6 right-6">Contributions</BoxTitle>
    <NextImage
      src={hand}
      alt="Total contributions"
      width={160}
      className="absolute bottom-0 left-6"
    />
  </section>
);
