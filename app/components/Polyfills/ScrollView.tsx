import React, {FC} from 'react';

import {BaseElementProps} from './types';

const ScrollView: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <div {...(rest || {})} className={`w-full h-full overflow-x-hidden overflow-y-scroll ${className}`}>
    <div className='w-full h-auto'>{children}</div>
  </div>
);

export default ScrollView;
