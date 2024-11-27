import React from 'react';

import {View} from '@/app/components/Polyfills';
import {usePresets} from '@/app/hooks/usePresets';
import {Themes} from '@/app/hooks/usePresets/types';
import {CheckBox} from '@/app/components/Elements';

const SelectTheme = () => {
  const {presets, storePresets} = usePresets();

  const onSelect = async (theme: Themes) => {
    await storePresets({theme});
  };

  return (
    <View className="w-full pt-4">
      <CheckBox
        title="Light"
        onSelect={() => onSelect(Themes.light)}
        selected={presets.theme === Themes.light}
      />
      <CheckBox
        title="Dark"
        onSelect={() => onSelect(Themes.dark)}
        selected={presets.theme === Themes.dark}
      />
    </View>
  );
};

export default SelectTheme;
