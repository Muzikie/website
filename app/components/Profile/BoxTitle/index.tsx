'use client';

import React, {FC} from 'react';

import {BoxTitleAttr} from '../types';

export const BoxTitle: FC<BoxTitleAttr> = ({children, className}) => (
  <h4 className={`font-martian text-neutralStrong uppercase ${className}`}>{children}</h4>
);
