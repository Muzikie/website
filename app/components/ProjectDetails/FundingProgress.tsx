import React, {FC} from 'react';
import BigNumber from 'bignumber.js';

import {FundingProgressProps} from './types';
import {View, Span, H1, H3, H4} from '@/app/components/Polyfills';
import {formatAmount} from '@/app/utils/formatters';
import { SupportedTokens } from '@/app/config/types';

const FundingProgress: FC<FundingProgressProps> = ({
  currentFunding,
  softGoal,
  hardGoal,
}) => {
  const currentFundingBN = new BigNumber(currentFunding);
  const hardGoalBN = new BigNumber(hardGoal);
  const softGoalBN = new BigNumber(softGoal);
  const fundingPercentage = currentFundingBN.multipliedBy(100).dividedBy(hardGoalBN).integerValue(BigNumber.ROUND_FLOOR);
  const softCapPercentage = softGoalBN.multipliedBy(100).dividedBy(hardGoalBN).integerValue(BigNumber.ROUND_FLOOR);
  const successPercentage = currentFundingBN.multipliedBy(100).dividedBy(softGoalBN).integerValue(BigNumber.ROUND_FLOOR);

  return (
    <View className="bg-neutralStrong dark:bg-neutralPale rounded-md p-4">
      <View className="flex flex-row justify-between">
        <View className="flex flex-col items-start justify-end">
          <Span className="text-neutralLight dark:text-neutralSteady pb-4">Progress</Span>
          <H1 className="text-neutralPure dark:text-neutralMighty">{`${successPercentage}%`}</H1>
        </View>
        <View className="flex flex-col items-end">
          <View className="flex flex-row items-center gap-2">
            <Span className="text-neutralLight dark:text-neutralSteady">Goal:&nbsp;</Span>
            <H4 className="text-neutralPure dark:text-neutralMighty">
              {formatAmount(softGoal, SupportedTokens.USDC)}
            </H4>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Span className="text-neutralLight dark:text-neutralSteady">
              Max acceptable:&nbsp;
            </Span>
            <H3 className="text-neutralPure dark:text-neutralMighty">
              {formatAmount(hardGoal, SupportedTokens.USDC)}
            </H3>
          </View>
        </View>
      </View>

      <View className="w-full bg-warnStrong h-[40px] rounded-md relative overflow-hidden mt-4">
        <View className="h-full absolute left-0 top-0 bg-gradient-to-r from-warnStrong to-warnMild rounded-lg" style={{width: `${softCapPercentage}%`}} />
        <View className="h-full absolute left-0 top-0 bg-assureStrong bg-stripes bg-cover bg-center rounded-lg" style={{width: `${fundingPercentage}%`}} />
      </View>
    </View>
  );
};

export default FundingProgress;
