import React, {FC} from 'react';

import {Span, H4, View, Link} from '@/app/components/Polyfills';
import {ProjectStatus, type ProjectProps} from './types';
import Artist from '../Artist';
import Meta from './Meta';
import Thumbnails from './Thumbnails';
import {Routes} from '@/app/config/routes';
import { getSmallestSize } from '@/app/utils/image';

const Project: FC<ProjectProps> = ({data}) => {
  const {documentId, id, name, summary, owner, reaction_count, type, images, has_reaction} = data;
  const thumbnails = (images || []).map(item => getSmallestSize(item.formats));

  return (
    <View className="w-full bg-neutralPure pt-4 rounded-xl mb-6">
      <Artist data={owner} className='px-4' />
      <Link to={{screen: `${Routes.Projects}/${documentId}`}}>
        <View className='px-4'>
          <H4 className="pt-4 pb-2">{name}</H4>
          <Span className="text-neutralMighty dark:!text-neutralStrong font-light">{summary}</Span>
          <Thumbnails data={thumbnails}  />
        </View>
      </Link>
      <Meta
        projectId={id}
        documentId={documentId}
        reactionCount={reaction_count}
        hasReaction={has_reaction}
        type={type}
        status={ProjectStatus.Live}
      />
    </View>
  );
};

export default Project;