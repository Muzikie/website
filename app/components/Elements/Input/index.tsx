import React from 'react';
import {TextInput, View, Span} from '@/app/components/Polyfills';

import type {InputProps} from './types';

const Input = ({
  value,
  onChange,
  name,
  placeholder,
  className,
  wrapperClassName,
  inputMode = 'text',
  multiline = false,
}: InputProps) => (
  <View className={`w-full ${wrapperClassName}`}>
    <Span>{placeholder}</Span>
    <TextInput
      onChangeText={onChange(name)}
      value={value}
      multiline={multiline}
      placeholderTextColor="#ccc"
      inputMode={inputMode}
      className={className}
    />
  </View>
);

export default Input;
