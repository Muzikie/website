'use client'

import React, {FC} from 'react';
import {View} from '@/app/components/Polyfills';

import {addProjectPhoto} from '@/app/actions/addProjectPhoto';
import {deleteProjectPhoto} from '@/app/actions/deleteProjectPhoto';
import ImageItem from './EditableItem';
import type {GalleryEditableProps} from './types';

const Editable: FC<GalleryEditableProps> = ({images = [], id}) => {
  const onAdd = async (formData: FormData) => {
    await addProjectPhoto(id, formData);
  };

  const onRemove = async (index: number) => {
    const imageId = images[index].id;
    const remainingIds = images
      .map(item => item.id)
      .filter((_, i) => i !== index);
    await deleteProjectPhoto(id, imageId, remainingIds);
  };

  // Format images array to always have 5 items (either images or placeholders)
  const formatImages = () =>
    Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);


  return (
    <View className="p-5">
      <View className="flex w-full flex-row gap-2 rounded-xl overflow-hidden h-[500px] wrap">
        {formatImages().map((image, index) => (
          <ImageItem
            image={image}
            onRemove={onRemove}
            onAdd={onAdd}
            index={index}
            key={`image-${index}`}
          />
        ))}
      </View>
    </View>
  );
};

export default Editable;
