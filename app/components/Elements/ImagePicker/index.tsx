'use client'
import React, {FC} from 'react';

import {ImagePickerProps} from './types';

const ImagePicker: FC<ImagePickerProps> = ({
  onSelectImage,
  children,
  disabled,
  className,
}) => {
  const pickImage = (event) => {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      onSelectImage(file);
    } else {
      console.log('No file was selected');
    }
  };

  return (
    <label htmlFor="image-selector" className={`relative rounded-3xl overflow-hidden cursor-pointer ${className}`}>
      <input
        className="hidden"
        disabled={disabled}
        id="image-selector"
        type="file"
        accept="image/*"
        onChange={pickImage}
      />
      {children}
    </label>
  );
};

export default ImagePicker;
