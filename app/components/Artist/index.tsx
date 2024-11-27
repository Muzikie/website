import React, {FC} from 'react';

import Avatar from '../Avatar';
import {ArtistProps} from './types';
import {Small, View} from '@/app/components/Polyfills';

const Artist: FC<ArtistProps> = ({data}) => (
  <View className="flex flex-row">
    <Avatar data={data?.avatar?.formats ?? {}} size={20} className="rounded-xl overflow-hidden" />
    <Small className="!text-neutralStrong tex-light ml-2">{`${data?.first_name} ${data?.last_name}`}</Small>
  </View>
);

export default Artist;