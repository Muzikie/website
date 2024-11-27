import React from 'react';
import {View, Text, Image} from '@/app/components/Polyfills';
import heart from '@/public/images/heart.png';

const VoteHint = () => {
  return (
    <View>
      <Image alt="" source={heart} />
      <Text>
        Help others find and enjoy listening. Most popular tunes receive badge
        and prize.
      </Text>
      <Text>Be the one to share and win!</Text>
    </View>
  );
};
export default VoteHint;
