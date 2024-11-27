import React, {FC} from 'react';

import {SafeAreaProps} from './types';

const SafeArea: FC<SafeAreaProps> = ({children, className}) => {
  return (
    <div className={`w-full h-full max-h-[900px] bg-secondaryStrong dark:secondaryMild ${className}`}>
      {children}
    </div>
  );
};

export default SafeArea;
