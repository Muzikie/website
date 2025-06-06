'use client'

import React, {FC} from 'react';

import {H3, H4, Span, TouchableOpacity, View} from '@/app/components/Polyfills';
import {CheckBox} from '@/app/components/Elements';
import {ContributeOptionProps} from './types';
import {fromBaseToken} from '@/app/utils/formatters';

const Option: FC<ContributeOptionProps> = ({data, selected, onSelected}) => {
  const onPress = () => onSelected(data.id);

  return (
    <TouchableOpacity
      className="pb-4"
      onPress={onPress}>
      <View className="w-full flex flex-row justify-between items-start">
        <CheckBox
          key={data.name}
          selected={selected}
          className="!w-[45px]"
        />
        <View className="pl-4">
          <View className="w-full flex flex-row justify-between">
            <H3>
              {data.name}
            </H3>
            <H4>{fromBaseToken(data.amount, 3)}</H4>
          </View>
          <Span className="w-full text-left">
            {data.rewards}
          </Span>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Option;
