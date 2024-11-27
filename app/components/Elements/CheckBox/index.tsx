import React from 'react';
import {View, H4, TouchableHighlight} from '@/app/components/Polyfills';
import {Icon} from '../Icon';
import {CheckboxProps} from './types';

const Checkbox = ({
  title, selected, onSelect, className,
}: CheckboxProps) => {
  return (
    <TouchableHighlight
      className={`w-full py-2 flex flex-row nowrap items-center justify-between ${className}`}
      onPress={onSelect}>
      <>
        {title && (<H4 className="text-primaryStrong !font-light">{title}</H4>)}
        <View className={`border-8 rounded-md w-[44px] h-[44px] ${selected ? 'bg-assureStrong border-assureStrong ': 'border-neutralLight '}`}>
          {selected && <Icon name="check" color="#fff" />}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default Checkbox;
