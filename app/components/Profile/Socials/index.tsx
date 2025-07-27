'use client';

import React, {FC, useState, ChangeEvent} from 'react';
import {redirect, RedirectType} from 'next/navigation';

import {TouchableHighlight} from '@/app/components/Polyfills';
import {Icon} from '@/app/components/Elements';
import {SocialsAttrs, SocialItemAttrs, SupportedSocials, Social} from '../types';
import {SOCIAL_BASE_URLS} from '@/app/config/constants';
import {storeSocials} from '@/app/actions/storeSocials';
import {BoxTitle} from '../BoxTitle';

const toSocialDict = (data: Social[]) => 
  Object.entries(SupportedSocials).reduce((acc, [, value]) => {
    const username = data.find(account => account.platform === value)?.username ?? '';
    acc[value] = username;
    return acc;
  }, {} as Record<SupportedSocials, string>);


const toSocialArr = (data: Record<SupportedSocials, string>): Social[] => 
  (Object.entries(data) as [SupportedSocials, string][])
    .filter(([, username]: [SupportedSocials, string]) => !!username)
    .map(([platform, username]: [SupportedSocials, string]) => ({platform, username}));

const SocialItem: FC<SocialItemAttrs> = ({
  platform,
  isEditing,
  value,
  saving,
  onChange,
  setIsEditing,
}) => {
  const sizeStyles = isEditing
    ? 'h-[48px] rounded-[12px] border-box px-2'
    : 'w-[64px] h-[64px] rounded-[32px] justify-center';

  const onClick = () => {
    if (!isEditing && value) {
      redirect(`${SOCIAL_BASE_URLS[platform]}${value}`, RedirectType.push);
    } else if (!isEditing && !value) {
      setIsEditing(true);
    }
  };

  return (
    <div
      className={`bg-neutralSeeThrough relative flex flex-row items-center ${sizeStyles}`}
      onClick={onClick}>
      <Icon name={platform} color="#293426" size={32} />
      {isEditing && (
        <input
          placeholder={`${platform} username`}
          value={value}
          disabled={saving}
          onChange={onChange(platform)}
          className="bg-transparent w-full h-full border-box pl-4 placeholder:text-[#29342640]"
        />
      )}
    </div>
  );
};

export const Socials: FC<SocialsAttrs> = (attrs) => {
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<SupportedSocials, string>>(toSocialDict(attrs.socials));

  const onChange =
    (fieldName: SupportedSocials) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
      });
    };

  const save = async () => {
    setSaving(true);
    try {
      await storeSocials(attrs.profileId, toSocialArr(formData));
    } finally {
      setSaving(false);
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

  return (
    <section className="h-[280px] lg:pr-6 border-box">
      <div className="w-full h-full border-box p-6 bg-lushLight rounded-[32px] flex flex-col justify-between relative">
        <div className="flex flex-row justify-between">
          <BoxTitle>Socials</BoxTitle>
          <TouchableHighlight
            onPress={toggleEdit}
            className="w-[44px] h-[44px] cursor-pointer absolute right-5 top-5">
            <Icon
              name={saving ? 'hourGlass' : isEditing ? 'check' : 'feather'}
              size={28}
              color={'#fff'}
            />
          </TouchableHighlight>
        </div>

        <h3
          className={`${isEditing ? 'hidden' : 'font-poppins text-neutralPure text-lg font-light leading-7 pb-8'}`}>
          Use your socials to extend your reach and increase your support
        </h3>

        <div
          className={`flex ${isEditing ? 'flex-col pt-6 gap-2' : 'flex-row gap-6'} flex-nowrap`}>
          {(
            Object.entries(SupportedSocials) as [
              keyof typeof SupportedSocials,
              SupportedSocials,
            ][]
          ).map(([key, value]) => (
            <SocialItem
              key={key}
              platform={value}
              isEditing={isEditing}
              saving={saving}
              onChange={onChange}
              value={formData[value]}
              setIsEditing={setIsEditing}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
