import React, {FC} from 'react';

import {Routes} from '@/app/config/routes';
import {getSmallestSize} from '@/app/utils/image';
import {fromBaseToken} from '@/app/utils/formatters';
import {View, H4, Span, Image, Link} from '@/app/components/Polyfills';
import {ImageFormats} from '@/app/config/types';
import type {ContributionProps} from './types';

const Contribution: FC<ContributionProps> = ({data}) => {
  const projectId = data.contribution_tier.project?.documentId ?? '';
  const formats = data.contribution_tier.project?.images?.length
    ? data.contribution_tier.project.images[0].formats
    : ({} as ImageFormats);
  const image = getSmallestSize(formats);

  return (
    <Link
      className="w-full"
      to={{
        screen: `${Routes.Projects}/${projectId}`as never,
      }}>
      <View className="flex flex-row no-wrap justify-between mb-4">
        <View className="flex flex-row nowrap items-center">
          <Image alt="Contribution" source={image.src} width={image?.width} height={image?.height} className="bg-secondaryMild rounded-xl overflow-hidden !p-0 w-[65px] h-[65px]" />
          <H4 className="pl-2 text-primaryStrong">
            {data.contribution_tier.project?.name ?? '-'}
          </H4>
        </View>
        <View className="text-right">
          <H4 className="text-primaryStrong">
            {data.contribution_tier.name}
          </H4>
          <Span className="text-primaryStrong font-light">
            {fromBaseToken(data.amount, 2)}
          </Span>
        </View>
      </View>
    </Link>
  );
};

export default Contribution;
