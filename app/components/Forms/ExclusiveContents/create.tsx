'use client';

import React, {FC, useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import {ExclusiveContentAttrs} from '@/app/components/Feed/types';
import {View, ScrollView} from '@/app/components/Polyfills';
import SectionHeader from '@/app/components/SectionHeader';
import {validateForm} from '@/app/utils/validators';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input, CheckBox} from '@/app/components/Elements';
import type {ContributionTier} from '@/app/components/Projects/types';
import {Routes} from '@/app/config/routes';
import {schema} from './schema';
import type {AccessibleTiersSelectProps, PostExclusiveContent} from './types';
import {FORMS} from '@/app/config/constants';

const AccessibleTiersSelect: FC<AccessibleTiersSelectProps> = ({
  tiers,
  onSelect,
  selection,
}) => (
  <View className="w-full h-full p-4">
    <SectionHeader title="Which contributors can access?" />
    {tiers.map(item => (
      <CheckBox
        key={item.id}
        title={item?.name}
        onSelect={() => onSelect(item)}
        selected={selection.includes(item.id)}
      />
    ))}
  </View>
);

const PostExclusiveContentsForm: FC<PostExclusiveContent> = ({
  contributionTiers,
  projectId,
}) => {
  const {push} = useRouter();
  const [data, setData] = useState<ExclusiveContentAttrs>({
    title: '',
    description: '',
    accessible_tiers: contributionTiers,
    public_access: false,
    media: null,
    project: projectId,
  });

  const onSubmit = async () => {
    localStorage.setItem(FORMS.POST_EXCLUSIVE_CONTENT, JSON.stringify(data));
    push(`${Routes.Projects}/${projectId}/post-exclusive-content/review`);
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  const onSelect = (item: ContributionTier) => {
    setData({
      ...data,
      accessible_tiers: data.accessible_tiers.map((val: ContributionTier) => ({
        ...val,
        selected: item.id === val.id && !item.selected,
      })),
    });
  };

  const handleCancel = () => {
    push(`${Routes.Projects}/${projectId}`);
  };

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem(FORMS.POST_EXCLUSIVE_CONTENT) || '',
      );
      const storedValidity = validateForm(schema, stored);
      if (storedValidity.isValid) {
        setData(stored);
      }
    } catch (error) {
      console.log('NO_VALID_STATE', error);
    }
  }, []);

  const validity = validateForm(schema, data);

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader title="Post updates to your community " />
      <Input
        placeholder="Title"
        onChange={onChange}
        value={data.title}
        name="title"
      />
      <Input
        placeholder="Description (Min 140 characters)"
        onChange={onChange}
        value={data.description}
        name="description"
        multiline
      />
      <AccessibleTiersSelect
        tiers={data.accessible_tiers}
        selection={data.accessible_tiers
          .filter(item => item.selected)
          .map(item => item.id)}
        onSelect={onSelect}
      />

      <ValidationFeedback {...validity} />
      <View className="w-full flex flex-row justify-center gap-4 pt-4">
        <Button
          title="Cancel"
          theme={ButtonThemes.secondary}
          onPress={handleCancel}
        />
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </ScrollView>
  );
};

export default PostExclusiveContentsForm;
