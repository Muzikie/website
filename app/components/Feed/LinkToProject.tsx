import React, {FC} from 'react';

import {Routes} from '@/app/config/routes';
import {Small, Span, View, Link} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {LinkToProjectProps} from './types';

const LinkToProject: FC<LinkToProjectProps> = ({name, id}) => (
  <Link
    className="w-full"
    to={{screen: `${Routes.Projects}/${id}`}}
  >
    <View className="w-full flex flex-row nowrap items-center bg-neutralPure rounded-md px-6 mb-4">
      <Small className="text-neutralSteady font-light">From</Small>
      <Icon name="link" size={26} />
      <Span className="text-neutralStrong">{name}</Span>
    </View>
  </Link>
);

export default LinkToProject;