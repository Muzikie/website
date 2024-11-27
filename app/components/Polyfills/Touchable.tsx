'use client'

import React, {FC} from 'react';

import {TouchableProps} from './types';

const Touchable: FC<TouchableProps> = ({children, onPress, disabled, className, ...restProps}) => (
  <button
    className={`block ${className}`}
    onClick={(e) => {
      if (!disabled && typeof onPress === 'function') {
        onPress(e);
     }
   }}
    {...(restProps || {})}
  >
    {children}
  </button>
);

export const TouchableHighlight = Touchable;

export const TouchableWithoutFeedback = Touchable;

export const TouchableOpacity = Touchable;
