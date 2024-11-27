import React, {FC} from 'react';

import {BaseElementProps} from './types';

export const Text: FC<BaseElementProps> = ({children, ...rest}) => (
  <span {...(rest || {})}>{children}</span>
);

export const H1: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <h1 {...(rest || {})} className={`font-poppins text-neutralAbsolute font-bold text-3xl ${className}`}>{children}</h1>
);

export const H2: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <h2 {...(rest || {})} className={`font-poppins text-neutralAbsolute font-semibold text-2xl ${className}`}>{children}</h2>
);

export const H3: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <h3 {...(rest || {})} className={`font-poppins text-neutralAbsolute font-semibold text-xl ${className}`}>{children}</h3>
);

export const H4: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <h4 {...(rest || {})} className={`font-poppins text-neutralAbsolute font-medium text-lg ${className}`}>{children}</h4>
);

export const H5: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <h5 {...(rest || {})} className={`font-poppins text-neutralAbsolute font-normal text-base tracking-wider ${className}`}>{children}</h5>
);

export const Span: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <span {...(rest || {})} className={`font-poppins text-neutralAbsolute font-light text-sm tracking-wider leading-7 ${className}`}>{children}</span>
);

export const Small: FC<BaseElementProps> = ({children, className, ...rest}) => (
  <small {...(rest || {})} className={`font-poppins text-neutralAbsolute font-light text-xs tracking-wide ${className}`}>{children}</small>
);
