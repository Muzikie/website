'use client'

import React, {FC, useState, ChangeEvent} from 'react';

import {TouchableHighlight} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {SocialsAttrs, SocialItemAttrs, SupportedSocials} from '../types';
import {BoxTitle} from '../BoxTitle';

const SocialItem: FC<SocialItemAttrs> = ({platform, isEditing, value, onChange}) => {
  const sizeStyles = isEditing ? 'h-[48px] rounded-[12px] border-box px-2' : 'w-[64px] h-[64px] rounded-[32px] justify-center';

  return (
    <div className={`bg-neutralSeeThrough flex flex-row items-center ${sizeStyles}`}>
      <Icon name={platform} color="#293426" size={32} />
      {
        isEditing ? (
          <input placeholder={`${platform} username`} value={value} onChange={onChange(platform)} className="bg-transparent w-full h-full border-box pl-4 placeholder:text-[#29342640]" />
        ) : null
      }
    </div>
  );
};

export const Socials: FC<SocialsAttrs> = (attrs) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    instagram: attrs.instagram ?? '',
    tiktok: attrs.tiktok ?? '',
    twitter: attrs.twitter ?? '',
  });

  const onChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };
  
  const save = async () => {
    // @todo do the save
  };

  const toggleEdit = async () => {
    if (isEditing) {
      await save();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <section className="h-[280px] lg:pr-6 border-box">
      <div className="w-full h-full border-box p-6 bg-lushLight rounded-[32px] flex flex-col justify-between relative">
        <div className="flex flex-row justify-between">
          <BoxTitle>Socials</BoxTitle>
          <TouchableHighlight
            onPress={toggleEdit}
            className="w-[44px] h-[44px] cursor-pointer absolute right-5 top-5">
            <Icon
              name={isEditing ? 'check' : 'feather'}
              size={28}
              color={'#fff'}
            />
          </TouchableHighlight>
        </div>

        <h3 className={`${isEditing ? 'hidden' : 'font-poppins text-neutralPure text-lg font-light leading-7 pb-8'}`}>Use your socials to extend your reach and increase your support</h3>

        <div className={`flex ${isEditing ? 'flex-col pt-6 gap-2' : 'flex-row gap-6'} flex-nowrap`}>
          <SocialItem platform={SupportedSocials.INSTAGRAM} isEditing={isEditing} onChange={onChange} value={formData.instagram} />
          <SocialItem platform={SupportedSocials.TIKTOK} isEditing={isEditing} onChange={onChange} value={formData.tiktok} />
          <SocialItem platform={SupportedSocials.TWITTER} isEditing={isEditing} onChange={onChange} value={formData.twitter} />
        </div>
      </div>
    </section>
  );
};
