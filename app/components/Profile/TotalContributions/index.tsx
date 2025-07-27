'use client'

import React, {FC, useState, useEffect} from 'react';
import NextImage from 'next/image';

import {TotalContributionsAttrs} from '../types';
import {SupportedTokens} from '@/app/config/types';
import {showBalance} from '@/app/utils/formatters';
import {BoxTitle} from '../BoxTitle';
import hand from '@/public/images/hand.png';

const SENTENCES = [
  'Contribute now, brag later.',
  'Start small, spark something big.',
  'Zero today, hero tomorrow.',
  'Add your drop to the ocean.',
  'Greatness begins with showing up.',
  'Not all legends start loud.',
  'Be the reason something exists.',
];

export const TotalContributions: FC<TotalContributionsAttrs> = ({amount}) => {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setIndex(Math.round(6 * Math.random()));
  }, []);

  return (
    <section className="bg-neutralPure w-full h-[290px] rounded-[32px] pt-12 pl-10 border-box relative overflow-hidden">
    {
      Number(amount) > 0 ? (
        <div className="flex flex-row flex-nowrap gap-2 items-baseline">
          <h3 className="font-martian text-6xl">{showBalance(amount)}</h3>
          <span className="font-martian font-light text-lg">{SupportedTokens.USDC}</span>
        </div>
      ) : (
        <div className="">
          <span className="font-martian font-light text-xs text-neutralSteady">No contributions yet</span>
          <h3 className="font-martian text-xl">{SENTENCES[index]}</h3>
        </div>
      )
    }
      <BoxTitle className="absolute bottom-6 right-6">Contributions</BoxTitle>
      <NextImage
        src={hand}
        alt="Total contributions"
        width={160}
        className="absolute bottom-0 left-6"
      />
    </section>
  );
};
