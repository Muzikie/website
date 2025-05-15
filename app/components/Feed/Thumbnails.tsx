import React, {FC} from 'react';

import {View, Image} from '@/app/components/Polyfills';
import {ThumbnailsProps} from './types';

const calculateWidths = (length: number) => {
  let totalRatio = 0;
  const ratios = [];
  for (let i = 0; i < length; i++) {
    const ratio = Math.pow(2, length - i - 1);
    ratios.push(ratio);
    totalRatio += ratio;
  }
  return ratios.map((ratio) => (ratio / totalRatio) * 100);
};

const Thumbnails: FC<ThumbnailsProps> = ({data}) => {
  if (!data.length) {
    return null;
  }

  const widths = calculateWidths(data.length);

  return (
    <View className="w-full h-[100px] rounded-xl py-4">
      <View className="w-full h-full flex flex-row gap-[10px]">
        {
          data.map((item, index) => (
            <Image
              key={item.src}
              alt="Project photo"
              source={item.src}
              width={item.width}
              height={item.height}
              style={{
                width: `calc(${widths[index]}% - 5px)`,
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ))
        }
      </View>
    </View>
  );
};

export default Thumbnails;