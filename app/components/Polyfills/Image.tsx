import React, {FC} from 'react';

import {ImageProps} from './types';

const Image: FC<ImageProps> = ({source, alt, className, ...rest}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={source}
    alt={alt || 'Image'}
    className={`text-[0px] ${className}`}
    {...(rest || {})}
  />
);

export default Image;
