import React, {FC} from 'react';

import {Span, H4, View, ScrollView} from '@/app/components/Polyfills';
import {CapitalizeKey} from '@/app/utils/formatters';
import type {FormSummaryProps, EntryProps} from './types';

const Entry: FC<EntryProps> = ({field, value, dented}) => (
  <View className={`pb-4 ${dented ? 'pl-4': ''}`}>
    <Span className="text-neutralStrong">{CapitalizeKey(field)}</Span>
    {
      typeof value === 'object' && (
        Object.entries(value).map(([key, val], index) => (
          <Entry key={`${key}${index}`} field={key} value={val} dented />
        ))
      )
    }
    {
      Array.isArray(value) && (
        value.map(([key, val], index) => (
          <Entry key={`${key}${index}`} field={key} value={val} dented />
        ))
      )
    }
    {
      typeof value !== 'object' && !Array.isArray(value) && (<H4 className="!font-light text-neutralMighty">{value}</H4>)
    }
  </View>
);

const FormSummary: FC<FormSummaryProps> = ({data}) => (
  <ScrollView>
    {Object.entries(data).map(([key, value], index) => (
      <Entry key={`${key}${index}`} field={key} value={value} />
    ))}
  </ScrollView>
);

export default FormSummary;
