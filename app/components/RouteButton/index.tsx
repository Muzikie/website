import React, {FC} from 'react';
import {View, TouchableHighlight} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {RouteButtonProps} from './types';

const RouteButton: FC<RouteButtonProps> = ({route, navigation, stateIndex, index}) => {
  const isFocused = stateIndex === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // Navigate to the tab if it's not focused already
      navigation.navigate(route.name);
    }
  };

  const iconColor = isFocused
    ? '#4E344D'
    : '#919191';

  return (
    <TouchableHighlight
      onPress={onPress}
      key={route.key}
      underlayColor="transparent"
      >
      <View>
        <Icon name={route.name.replace(' ', '')} color={iconColor} />
      </View>
    </TouchableHighlight>
  );
};

export default RouteButton;
