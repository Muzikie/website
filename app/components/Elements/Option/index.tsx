import React from 'react';

import {View, H4, TouchableHighlight, Linking} from '@/app/components/Polyfills';
import {Icon} from '../index';
import {OptionProps} from './types';

const Option = ({
  title, state, href, onPress, icon = 'rightChev',
}: OptionProps) => {
  if (!icon && href) {
    icon = 'link';
  }

  if (href && !onPress) {
    onPress = () => {
      Linking.openURL(href);
    };
  }

  return (
    <TouchableHighlight
      className="w-full flex flex-row nowrap justify-between items-center mb-4"
      underlayColor="transparent"
      onPress={onPress}>
      <>
        <H4 className="!font-light">
          {title}
        </H4>
        <View className="flex flex-row nowrap justify-between items-center">
          <H4 className="!font-light">{state}</H4>
          <View>
            <Icon name={icon} color="#825E87" />
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
};

export default Option;
