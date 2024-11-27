'use server'

import React, {FC} from 'react';

import {ProjectStatus} from '@/app/components/Projects/types';
import Editable from './Editable';
import Readable from './Readable';
import {GalleryProps} from './types';
import {getUserAccount} from '@/app/actions/getUserAccount';

const Gallery: FC<GalleryProps> = async ({id, images, ownerId, projectStatus}) => {
  const account = await getUserAccount();

  if (ownerId === account?.id && projectStatus === ProjectStatus.Draft) {
    return <Editable id={id} images={images} />;
  }
  return <Readable id={id} images={images} />;
};

export default Gallery;
