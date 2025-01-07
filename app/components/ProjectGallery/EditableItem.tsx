'use client'

import React, {FC, ChangeEvent, MouseEvent} from 'react';
import {Image, TouchableHighlight} from '@/app/components/Polyfills';

import {Icon} from '@/app/components/Elements';
import {getLargestSize} from '@/app/utils/image';
import type {EditableImageProps} from './types';

const ImageItem: FC<EditableImageProps> = ({
  index,
  image,
  disabled,
  onRemove,
  onAdd,
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = (e.target as HTMLInputElement).files![0];
    const formData = new FormData();
    formData.append('files.images', file);
    formData.append('data', JSON.stringify({}));
    onAdd(formData);
  };

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    onRemove(index);
  }

  const source = getLargestSize(image?.formats ?? {});

  return (
    <label
      className={`${index === 0 ? 'flex-[4] h-full' : 'flex-1'} bg-[#FFEEFF] relative overflow-hidden ${typeof img === 'string' ? '' : 'flex flex-row justify-center items-center'}`}
      htmlFor={`image-item-${index}`}
      >
        {
          !image && (
            <input
              className="text-[0px] invisible absolute"
              disabled={disabled}
              id={`image-item-${index}`}
              type="file"
              accept="image/*"
              onChange={onChange}
            />
          )
        }
      <Image
        alt="Some Photo"
        source={source.src}
        width={source.width}
        height={source.height}
        className="min-w-full min-h-full object-cover"
      />
      {image && (
        <TouchableHighlight onPress={onClick} className="absolute left-2 top-2 bg-neutralPure rounded-md">
          <Icon name="cross" size={20} />
        </TouchableHighlight>
      )}
    </label>
  );
};

export default ImageItem;