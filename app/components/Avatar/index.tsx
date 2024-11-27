import React from 'react';

import {View, Image} from '@/app/components/Polyfills';
import type {AvatarProps} from './types';
import {getSmallestSize} from '@/app/utils/image';

const Avatar = ({className, data, size = 124}: AvatarProps) => {
  const source = getSmallestSize(data);
  return (
    <View className={className} style={{width: `${size}px`, height: `${size}px`}}>
      <Image source={source?.src} width={source?.width} height={source?.height} alt="Avatar" />
    </View>
  );
};

export default Avatar;