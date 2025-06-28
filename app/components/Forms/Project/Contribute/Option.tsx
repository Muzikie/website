'use client'

import React, {FC} from 'react';

import {H3, H4, MarkDown, TouchableOpacity, View} from '@/app/components/Polyfills';
import {CheckBox} from '@/app/components/Elements';
import {ContributeOptionProps} from './types';
import {formatAmount} from '@/app/utils/formatters';
import {SupportedTokens} from '@/app/config/types';

const Option: FC<ContributeOptionProps> = ({data, selected, onSelected}) => {
  const onPress = () => onSelected(data.id);

  return (
    <TouchableOpacity
      className="pb-4 w-full"
      onPress={onPress}>
      <View className="flex flex-row justify-between items-start">
        <CheckBox
          key={data.name}
          selected={selected}
          className="!w-[45px]"
        />
        <View className="pl-4 w-full">
          <View className="flex flex-row justify-between">
            <H3>
              {data.name}
            </H3>
            <H4>{formatAmount(data.amount, SupportedTokens.USDC)}</H4>
          </View>
          <View className="text-left">
            <MarkDown>
              {data.rewards}
            </MarkDown>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Option;
