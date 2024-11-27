import React, {FC} from 'react';
import NextImage from 'next/image';

import {DeadlineProps} from './types';
import {View, H3, Span} from '@/app/components/Polyfills';
import icon from '@/public/images/deatlineicon.png';

const Deadline: FC<DeadlineProps> = ({date}) => {
  return (
    <View className="w-full flex flex-row items-center bg-skyWeak dark:bg-skyStrong rounded-md p-4 my-6">
      <NextImage
        alt="Deadline icon"
        src={icon}
        className="w-[40px] h-[40px]"
        width={40}
        height={40}
      />
      <View className="flex flex-col pl-4">
        <Span className="!text-primaryMighty dark:!text-neutralMighty">Deadline</Span>
        <H3 className="!text-primaryMighty dark:!text-neutralMighty !font-normal">{date}</H3>
      </View>
    </View>
  );
};

export default Deadline;
