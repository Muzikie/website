import React from 'react';
import {TouchableWithoutFeedback} from '@/app/components/Polyfills';
import {Icon} from '../Icon';
import {IconButtonProps} from './types';

const IconButton = ({
  onPress,
  iconSize,
  iconColor,
  iconName,
  className,
  disabled,
}: IconButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled} className={className}>
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </TouchableWithoutFeedback>
  );
};

export default IconButton;
