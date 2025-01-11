'use client';

import React, { FC, useState, useCallback } from 'react';
import { Span, TouchableOpacity, View } from '@/app/components/Polyfills';
import { Icon } from '@/app/components/Elements';
import { MetaProps, FeedType, ProjectStatus } from './types';
import { reactToProject } from '@/app/actions/reactToProject';

const Meta: FC<MetaProps> = ({
  projectId,
  reactionCount = 0,
  hasReaction = false,
  backers,
  type,
  status,
}) => {
  const [currentReactionCount, setCurrentReactionCount] = useState(reactionCount);
  const [hasUserReacted, setHasUserReacted] = useState(hasReaction);
  const [isLoading, setIsLoading] = useState(false);

  const statusTag =
    status === ProjectStatus.Failed
      ? 'Failed'
      : status === ProjectStatus.Successful
      ? 'Successful'
      : 'Support';

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

  return (
    <View className="flex flex-row justify-between items-end pt-6">
      <View className="flex flex-row nowrap gap-4">
        {/* Reaction Section */}
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={toggleReaction}
            disabled={isLoading}
            className={`flex flex-row items-center ${isLoading ? 'opacity-50' : ''}`}
          >
            <Icon
              name="thumbsUp"
              size={18}
              color={hasUserReacted ? '#825E87' : '#6B7280'}
            />
          </TouchableOpacity>

          {currentReactionCount > 0 && (
            <Span className="text-neutralSteady font-light">
              {currentReactionCount}
            </Span>
          )}
        </View>
        {/* Backers Section */}
        {type === FeedType.Project && currentReactionCount > 0 && (
          <View className="flex flex-row items-center">
            <Icon name="Profile" size={18} color="#6D6C6C" />
            <Span className="text-neutralSteady font-light">{`${backers} fans`}</Span>
          </View>
        )}
      </View>
      {/* Status Section */}
      <View
        className={`${
          statusTag === 'Successful'
            ? 'text-assureStrong'
            : statusTag === 'Failed'
            ? 'text-warnStrong'
            : ''
        } text-neutralPure rounded-xl`}
      >
        <Span>{statusTag}</Span>
      </View>
    </View>
  );
};

export default Meta;
