'use client';

import React, {FC, useState, useCallback} from 'react';

import {Routes} from '@/app/config/routes';
import {Span, H5, TouchableOpacity, View, Link} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {reactToProject} from '@/app/actions/reactToProject';
import {MetaProps, FeedType, ProjectStatus} from './types';

const Meta: FC<MetaProps> = ({
  projectId,
  documentId,
  reactionCount = 0,
  hasReaction = false,
  type,
  status,
}) => {
  const [currentReactionCount, setCurrentReactionCount] = useState(reactionCount);
  const [hasUserReacted, setHasUserReacted] = useState(hasReaction);
  const [isLoading, setIsLoading] = useState(false);

  const toggleReaction = useCallback(async () => {
    if (isLoading) return;

    // Optimistically update UI
    const nextReactionState = !hasUserReacted;
    const nextReactionCount = nextReactionState
      ? currentReactionCount + 1
      : currentReactionCount - 1;

    setHasUserReacted(nextReactionState);
    setCurrentReactionCount(nextReactionCount);
    setIsLoading(true);

    try {
      const result = await reactToProject(projectId, hasUserReacted);

      // Revert UI if API fails
      if (!result.success) {
        setHasUserReacted(hasUserReacted);
        setCurrentReactionCount(currentReactionCount);
      }
    } catch (error) {
      console.error('Error toggling reaction:', error);

      // Revert UI on error
      setHasUserReacted(hasUserReacted);
      setCurrentReactionCount(currentReactionCount);
    } finally {
      setIsLoading(false);
    }
  }, [currentReactionCount, hasUserReacted, isLoading, projectId]);

  let statusTag = 'Live';
  if (status === ProjectStatus.Failed) {
    statusTag = 'Failed';
  }
  if (status === ProjectStatus.Successful) {
    statusTag = 'Successful';
  }

  return (
    <View className="flex flex-row">
      <TouchableOpacity
        onPress={toggleReaction}
        disabled={isLoading}
        className={`flex flex-row items-center p-4 ${isLoading ? 'opacity-50' : ''}`}
      >
        <Icon
          name="thumbsUp"
          size={18}
          color={hasUserReacted ? '#42BFC7' : '#6B7280'}
        />
        <H5 className={`text-neutralSteady font-light ${hasUserReacted ? '!text-assureStrong' : 'text-transparent'}`}>
          {currentReactionCount}
        </H5>
      </TouchableOpacity>
      {type === FeedType.Project ? (
        <Link to={{screen: `${Routes.Projects}/${documentId}`}} className='w-full flex flex-row justify-end'>
          <View
            className={`p-4 ${statusTag === 'Successful' ? 'text-assureStrong' : ''} ${
              statusTag === 'Successful' ? 'text-warnStrong' : ''
            } text-neutralPure rounded-xl`}>
            <Span>{statusTag}</Span>
          </View>
        </Link>
      ) : null}
    </View>
  );
};

export default Meta;
