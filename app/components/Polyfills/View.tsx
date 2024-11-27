import React, {FC} from 'react';

import {BaseElementProps} from './types';

const View: FC<BaseElementProps> = ({children, ...rest}) => (
  <div {...(rest || {})}>{children}</div>
);

export default View;
