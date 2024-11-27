import React from 'react';
import NextImage from 'next/image';

const ImageBackground = ({source, alt, ...rest}) => (
  <NextImage source={source} alt={alt || 'Background Image'}  {...(rest || {})} />
);

export default ImageBackground;
