import React, {FC, useCallback} from 'react';
import {View, H3, Image, TouchableHighlight, Linking} from '@/app/components/Polyfills';

import {ArtistProps} from './types';
import instagramIcon from '@/public/images/instagram.png';
import xIcon from '@/public/images/twitter.png';
import twitchIcon from '@/public/images/twitch.png';
import {getSmallestSize} from '@/app/utils/image';

enum SocialPlatforms {
  Instagram = 'instagram',
  Twitter = 'twitter',
  Twitch = 'twitch',
}

const Artist: FC<ArtistProps> = ({data}) => {
  const openPlatform = useCallback(
    (platform: SocialPlatforms) => () => {
      const {instagram, twitter, twitch} = data ?? {};
      const platforms: Record<SocialPlatforms, string> = {
        instagram: `https://instagram.com/${instagram}`,
        twitter: `https://x.com/${twitter}`,
        twitch: `https://twitch.com/${twitch}`,
      };
      Linking.openURL(platforms[platform]).catch(err => {
        console.error(`Error visiting ${platform}`, err);
      });
    },
    [data],
  );

  const {
    first_name,
    last_name,
    avatar = {data: null},
    instagram,
    twitter,
    twitch,
  } = data;
  const image = getSmallestSize(avatar?.data?.attributes.formats ?? {});
  const name = [first_name, last_name].join(' ') || 'What\'s his face?';

  return (
    <View className="w-full flex flex-row items-center bg-amberMild dark:bg-amberStrong rounded-md p-4 my-6">
      <View className="flex flex-row items-center">
        <View className="w-[50px] h-[50px] rounded-xl overflow-hidden">
          <Image
            alt="Artist photo"
            source={image?.src}
            width={image?.width}
            height={image?.height}
            className="w-[50px] h-[50px]"
          />
        </View>
        <H3 className="pl-4 text-neutralPure dark:!text-neutralMighty !font-normal">{name}</H3>
      </View>
      <View>
        {instagram && (
          <TouchableHighlight
            onPress={openPlatform(SocialPlatforms.Instagram)}>
            <Image alt="" source={instagramIcon} />
          </TouchableHighlight>
        )}
        {twitch && (
          <TouchableHighlight
            onPress={openPlatform(SocialPlatforms.Twitch)}>
            <Image alt="" source={twitchIcon} />
          </TouchableHighlight>
        )}
        {twitter && (
          <TouchableHighlight
            onPress={openPlatform(SocialPlatforms.Twitter)}>
            <Image alt="" source={xIcon} />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default Artist;
