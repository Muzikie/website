import React, {FC} from 'react';

import { getUserAccount } from '@/app/actions/getUserAccount';
import { getUserContributions } from '@/app/actions/getUserContributions';
import {View} from '@/app/components/Polyfills';
import SectionHeader from '../SectionHeader';
import Contribution from './Contribution';
import type {Contribution as ContributionType} from './types';


const Contributions: FC = async () => {
  const account = await getUserAccount();
  const contributions = await getUserContributions(account?.id);

  return (
    <View className="w-full p-6">
      {contributions.length > 0 && (
        <SectionHeader title="Contributions" />
      )}
      {contributions.map((item: ContributionType) => (
        <Contribution data={item} key={item.id} />
      ))}
    </View>
  );
};

export default Contributions;
