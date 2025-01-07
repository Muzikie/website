import React, {FC} from 'react';

import {Span, H4, View, Link} from '@/app/components/Polyfills';
import {ProjectStatus, type ProjectProps} from './types';
import Artist from '../Artist';
import Meta from './Meta';
import {Routes} from '@/app/config/routes';

const Project: FC<ProjectProps> = ({data}) => {
  const {documentId, name, summary, owner, reaction_count, type} = data;
  // const image = data?.length
  //   ? {uri: `${API_URL}${data[0].formats.thumbnail.url}`}
  //   : avatar;

  return (
    <View className="w-full bg-neutralPure p-4 rounded-xl mb-6">
      <Artist data={owner} />
      <Link to={{screen: `${Routes.Projects}/${documentId}`}}>
        <View>
          <H4 className="pt-4 pb-2">{name}</H4>
          <Span className="text-neutralMighty dark:!text-neutralStrong font-light">{summary}</Span>
          <Meta
            reactionCount={reaction_count}
            type={type}
            status={ProjectStatus.Live}
          />
        </View>
      </Link>
    </View>
  );
};

export default Project;