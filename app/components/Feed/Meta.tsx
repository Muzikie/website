import React, {FC} from 'react';

import {Span, View} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {MetaProps, FeedType, ProjectStatus} from './types';

const Meta: FC<MetaProps> = ({reactionCount, backers, type, status}) => {
  let statusTag = 'Support';
  if (status === ProjectStatus.Failed) {
    statusTag = 'Failed';
  }
  if (status === ProjectStatus.Successful) {
    statusTag = 'Successful';
  }

  return (
    <View className="flex flex-row justify-between items-end pt-6">
      <View className="flex flex row nowrap gap-4">
        <View className="flex flex row nowrap items-center">
          <Icon name="thumbsUp" size={18} color="#6D6C6C" />
          {reactionCount && reactionCount > 0 ? (
            <Span className="text-neutralSteady font-light">
              {reactionCount}
            </Span>
          ) : null}
        </View>

        {type === FeedType.Project && reactionCount && reactionCount > 0 ? (
          <View className="flex flex row nowrap items-center">
            <Icon name="Profile" size={18} color="#6D6C6C" />
            <Span className="text-neutralSteady font-light">{`${backers} fans`}</Span>
          </View>
        ) : null}
      </View>
      {type === FeedType.Project ? (
        <View
          className={`${statusTag === 'Successful' ? 'text-assureStrong' : ''} ${
            statusTag === 'Successful' ? 'text-warnStrong' : ''
          } text-neutralPure rounded-xl`}>
          <Span>{statusTag}</Span>
        </View>
      ) : null}
    </View>
  );
};

export default Meta;
