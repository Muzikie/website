import React, {FC} from 'react';

import {TextInputProps} from './types';

const TextInput: FC<TextInputProps> = ({
  onChangeText,
  keyboardType = 'text',
  multiline,
  className,
  ...rest
}) => {
  const onChange = (e) => {
    onChangeText(e.target.value)
 };

  if (multiline) {
    return (
      <textarea
        className={`w-full h-[44px] bg-inputBg text-neutralMighty rounded-md mt-2 mb-4 px-4 ${className}`}
        onChange={onChange}
        {...(rest || {})}
      />
    );
 }

  return (
    <input
      className={`w-full h-[44px] bg-inputBg text-neutralMighty rounded-md mt-2 mb-4 px-4 ${className}`}
      type={keyboardType}
      onChange={onChange}
      {...(rest || {})}
    />
  );
}

export default TextInput;
