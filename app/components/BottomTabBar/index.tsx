import React from 'react';
import {View} from '@/app/components/Polyfills';
import RouteButton from '../RouteButton';
import {EnhancedBottomTabBarProps} from './types';

const BottomTabBar = ({
  state,
  navigation,
}: EnhancedBottomTabBarProps) => {
  return (
    <View>
      <View>
        {/* <Player /> */}
        <View>
          {state.routes.map((route, index: number) => (
            <RouteButton
              navigation={navigation}
              route={route}
              stateIndex={state.index}
              index={index}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default BottomTabBar;
