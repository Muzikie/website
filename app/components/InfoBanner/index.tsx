'use client'

import {FC, useEffect, useState} from 'react';
import {Icon} from '../Elements';
import {InfoBannerProps} from './types';

const ID_PREFIX = 'info-banner-dismissed';

export const InfoBanner: FC<InfoBannerProps> = ({ id, children, className }) => {
  const localStorageKey = `${ID_PREFIX}-${id}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(localStorageKey);
    if (!dismissed) {
      setVisible(true);
    }
  }, [localStorageKey]);

  const handleClose = () => {
    localStorage.setItem(localStorageKey, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`w-full relative ${className || ''}`}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 bg-white rounded-md"
        aria-label="Close banner"
      >
        <Icon name="cross" size={24} />
      </button>
      {children}
    </div>
  );
};
