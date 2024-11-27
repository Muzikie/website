import React from 'react';
import {View, Image} from '@/app/components/Polyfills';

import appLogo from '@/public/images/IconText.png';

const Splash = () => {
  return (
    <View>
      <View>
        <Image alt="" source={appLogo} resizeMode="cover" />
      </View>
    </View>
  );
};

export default Splash;
