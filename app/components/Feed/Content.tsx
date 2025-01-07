import React, {FC} from 'react';

import {View, H4, Span} from '@/app/components/Polyfills';
import {ContentProps} from './types';
import LinkToProject from './LinkToProject';
import Artist from '../Artist';
import Meta from './Meta';

const Project: FC<ContentProps> = ({data}) => {
  const {reaction_count, description, title, project, owner, type} = data;
  // const {data} = images;
  // const image = data?.length
  //   ? {uri: `${API_URL}${data[0].attributes.formats.thumbnail.url}`}
  //   : avatar;
  return (
    <View className="w-full bg-secondaryMild p-4 mb-6 rounded-xl">
      <LinkToProject name={project.name} id={project.documentId} />
      <Artist data={owner} />
      <View className="mt-2">
        {title && <H4 className="pt-4 pb-2">{title}</H4>}
        {description && <Span className="text-neutralStrong font-light">{description}</Span>}
      </View>
      <Meta reactionCount={reaction_count} type={type} />
    </View>
  );
};

export default Project;