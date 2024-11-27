import React, {FC} from 'react';

import {View, Image, Link} from '@/app/components/Polyfills';
import {getLargestSize} from '@/app/utils/image';
import {GalleryReadableProps, ReadableImageProps} from './types';
import {Routes} from '@/app/config/routes';

const ImageItem: FC<ReadableImageProps> = ({index, image}) => {
  const img = getLargestSize(image?.attributes.formats ?? {});
  return (
    <Link
      disabled={typeof img === 'number'}
      to={{screen: Routes.Picture, params: {url: img.src}}}
      className={`${index === 0 ? 'flex-[4] h-full' : 'flex-1'} bg-[#FFEEFF] overflow-hidden ${typeof img === 'string' ? '' : 'flex flex-row justify-center items-center'}`}
      >
      <Image
        alt="Gallery photo"
        source={img.src}
        width={img.width}
        height={img.height}
        className="min-w-full min-h-full object-cover"
      />
    </Link>
  );
};

const Readable: FC<GalleryReadableProps> = ({images = []}) => (
  <View className="p-5">
    <View className="flex w-full flex-row gap-2 rounded-xl overflow-hidden h-[500px]wrap">
      {images.map((image, index) => (
        <ImageItem image={image} index={index} key={`image-${index}`} />
      ))}
    </View>
  </View>
);

export default Readable;
