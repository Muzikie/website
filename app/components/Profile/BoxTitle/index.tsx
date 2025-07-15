'use client';

import React, {FC} from 'react';

import {Span} from '@/app/components/Polyfills';
import {BoxTitleAttr} from '../types';

export const BoxTitle: FC<BoxTitleAttr> = ({children, className}) => (
  <Span className={`text-neutralString uppercase ${className}`}>{children}</Span>
);
