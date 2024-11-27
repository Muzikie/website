import React, {FC} from 'react';

import {View, H3, Span} from '@/app/components/Polyfills';
import {SectionHeaderProps} from './types';

const SectionHeader: FC<SectionHeaderProps> = ({title, subtitle, className}) => {
  return (
    <View className={`pb-4 ${className}`}>
      <H3 className="!font-normal text-neutralMighty">{title}</H3>
      {subtitle && <Span className="text-neutralMighty">{subtitle}</Span>}
    </View>
  );
};

export default SectionHeader;
