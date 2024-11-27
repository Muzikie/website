'use client'

import React, {FC} from 'react';
import {View, Image} from '@/app/components/Polyfills';

import {Icon, ImagePicker} from '@/app/components/Elements';
import {getSmallestSize} from '@/app/utils/image';
import {ImageFormats} from '@/app/config/types';

const Avatar: FC<{data: ImageFormats}> = ({data}) => {
  const source = getSmallestSize(data);

  const submit = async (file) => {
    if (file) {
      const formData = new FormData();

      formData.append('files.avatar', file);
      formData.append('data', JSON.stringify({}));
      // @ts-expect-error Form Data type is not properly defined.
      await update(formData);
    }
  };

  return (
    <View className="flex flex-row justify-center">
      <ImagePicker onSelectImage={submit} className="w-[124px] h-[124px]">
        <Image alt="Profile picture" source={source?.src} width={source?.width} height={source?.height}  className="w-full relative z-0" />
        <Icon
          name="feather"
          size={32}
          color="#999"
          className="absolute z-10 right-1 bottom-1"
        />
      </ImagePicker>
    </View>
  );
};

export default Avatar;
