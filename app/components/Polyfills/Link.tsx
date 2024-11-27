import React, {FC} from 'react';
import NextLink from 'next/link';

import View from './View';
import {LinkProps} from './types';

const Link: FC<LinkProps> = ({children, to, className, disabled, prefetch}) => {
  const pathname = to.screen;
  const searchParams = new URLSearchParams(to.params as Record<string, string>).toString();
  const href = `${pathname}${searchParams ? `?${searchParams}` : ''}`;
  // const isActive = markActive !== false && route.replace(/^\//, '') === to.screen.replace(/^\//, '');
  const isActive = false;
  const Element = disabled ? View : NextLink;

  return <Element href={href} prefetch={prefetch} className={`cursor-pointer ${isActive ? '!bg-assureStrong' : ''} ${className}`}>{children}</Element>;
};

export default Link;

