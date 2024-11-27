import React, {FC} from 'react';
import {Text, Image, View, Link} from '@/app/components/Polyfills';


import type {ProjectProps} from './types';
import avatar from '@/public/images/avatars/a0.jpg';
import {Routes} from '@/app/config/routes';

const Project: FC<ProjectProps> = ({item}) => {
  const {
    attributes: {name, summary, project_type, images, users_permissions_user},
    id,
  } = item;
  const {
    data: {
      attributes: {email},
    },
  } = users_permissions_user;
  const {data} = images;
  const baseURl = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${process.env.NEXT_PUBLIC_IMAGE_PORT ? ':' + process.env.NEXT_PUBLIC_IMAGE_PORT : ''}`
  const image = data?.length
    ? {uri: `${baseURl}${data[0].attributes.formats.thumbnail.url}`}
    : avatar;

  return (
    <View className="w-full px-6">
      <Link
        to={{screen: `${Routes.Projects}/${id}`}}>
        <View>
          <Image alt="" source={image} />
          <View>
            <View>
              <Text>{`${project_type} by`}</Text>
              <Text>{email}</Text>
            </View>
            <Text>{name}</Text>
            <Text>{summary}</Text>
          </View>
        </View>
      </Link>
    </View>
  );
};

export default Project;
