'use client';

import React, {FC, useState} from 'react';

import {View, H2, Span, TouchableHighlight} from '@/app/components/Polyfills';
import {Icon, Input} from '@/app/components/Elements';
import {updateProfile} from '@/app/actions/updateProfile';
import {Avatar} from '../Avatar';
import {AboutMeAttrs} from '../types';

export const AboutMe: FC<AboutMeAttrs> = ({data}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    bio: data?.bio ?? '',
  });
  const onInputChange = (fieldName: string) => (value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const save = async () => {
    const result = await updateProfile(formData, data.profileId);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const toggleEdit = async () => {
    if (isEditing) {
      await save();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const fullName =
    [data?.first_name, data?.last_name].filter(item => !!item).join(' ') ||
    'Future Grammy winner';

  return (
    <View className="h-[600px] from-[#0D83AE] to-[#5BB2B6] bg-gradient-to-b rounded-[32px] text-center overflow-hidden border border-neutralStrong">
      <View className="h-full flex flex-col justify-stretch px-8 pt-12 bg-[url(/images/clouds.png)] bg-right-bottom bg-no-repeat relative">
        <TouchableHighlight
          onPress={toggleEdit}
          className="w-[44px] h-[44px] cursor-pointer absolute right-5 top-5">
          <Icon
            name={isEditing ? 'check' : 'feather'}
            size={28}
            color={'#fff'}
          />
        </TouchableHighlight>
        <Avatar data={data.avatar?.formats ?? {}} profileId={data.profileId} />
        {!isEditing && (
          <>
            <H2 className="font-poppins text-neutralPure font-bold text-3xl py-8 uppercase">
              {fullName}
            </H2>
            <Span className="font-poppins text-neutralPure font-bold text-3xl">
              {data.bio ??
                'No bio yet — just a mysterious beat waiting to drop.'}
            </Span>
          </>
        )}
        {isEditing && (
          <>
            <View className="w-full flex flex-row justify-center items-end p-6 gap-2">
              <Input
                placeholder="First name"
                onChange={onInputChange}
                value={formData.first_name}
                name="first_name"
                wrapperClassName="text-left"
              />
              <Input
                placeholder="Last name"
                onChange={onInputChange}
                value={formData.last_name}
                name="last_name"
                wrapperClassName="text-left"
              />
            </View>
            <View className="grow">
              <Input
                placeholder="Bio"
                onChange={onInputChange}
                value={formData.bio}
                name="bio"
                wrapperClassName="h-full p-6 border-box flex flex-col text-left"
                className="grow"
                multiline
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};
