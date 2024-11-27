import React from 'react';
import {TouchableHighlight, Span} from '@/app/components/Polyfills';
import {ButtonProps, ButtonThemes} from './types';

const Button = ({
  onPress,
  title,
  disabled,
  theme,
  type,
  className,
}: ButtonProps) => {
  const config = {
    wrapper: 'bg-primaryStrong hover:shadow-xl',
    text: 'text-neutralPure',
  };
  if (theme === ButtonThemes.secondary) {
    config.wrapper = 'bg-neutralPure dark:bg-neutral-950/50 border border-neutral-300/30 hover:shadow-xl';
    config.text = 'text-primaryMighty dark:text-neutralMighty';
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      type={type}
      className={`rounded-md min-w-[200px] grow text-center h-[50px] cursor-pointer ${config.wrapper} ${className}`}
    >
      <Span className={`!pb-0 leading-[50px] ${config.text}`}>{title}</Span>
    </TouchableHighlight>
  );
};

export default Button;
