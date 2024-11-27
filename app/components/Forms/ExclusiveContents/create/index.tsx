import React, {FC, useState} from 'react';
import {View, ScrollView, Dimensions, Text} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {useGetData} from '@/app/hooks/useQuery';
import {validateForm} from '@/app/utils/validators';
import {ENDPOINTS} from '@/app/config/endpoints';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input, CheckBox} from '@/app/components/Elements';
import PostExclusiveContentsReview from './Review';
import {schema} from './schema';
import type {ContributionTier} from '../../../Projects/types';
import type {
  AccessibleTiersSelectProps,
  PostExclusiveContentsFormProps,
  FormData,
} from './types';

const AccessibleTiersSelect: FC<AccessibleTiersSelectProps> = ({
  tiers,
  onSelect,
  selection,
}) => {
  return (
    <View>
      <Text>Which contributors can access?</Text>
      {tiers.map(item => (
        <CheckBox
          key={item.id}
          title={item?.attributes.name}
          onSelect={() => onSelect(item)}
          selected={selection.includes(item.id)}
        />
      ))}
    </View>
  );
};

const PostExclusiveContentsForm: FC<PostExclusiveContentsFormProps> = ({
  projectId,
}) => {
  const [data, setData] = useState<FormData>({
    title: '',
    description: '',
    accessible_tiers: [],
  });
  const {show} = useModal();
  const {data: contributionTiers} = useGetData(ENDPOINTS.CONTRIBUTION_TIERS, {
    filters: {
      project: projectId,
    },
  });

  const maxHeight = Dimensions.get('window').height * 0.6;
  const onSubmit = async () => {
    // Keyboard.dismiss();
    const previewData = {
      title: data.title,
      description: data.description,
      accessible_tiers: data.accessible_tiers.map((id: number) =>
        contributionTiers.data.find((item: ContributionTier) => item.id === id),
      ),
    };
    show({
      title: 'Looking good!',
      description: '',
      content: <PostExclusiveContentsReview data={previewData} />,
    });
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
      accessible_tiers: data.accessible_tiers.includes(item.id)
        ? data.accessible_tiers.filter(val => val !== item.id)
        : [...data.accessible_tiers, item.id],
    });
  };

  // @ts-expect-error The validationForm param is simply more generic
  const validity = validateForm(schema, data);

  return (
    <View>
      <ScrollView style={{maxHeight}}>
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
          tiers={contributionTiers?.data ?? []}
          selection={data.accessible_tiers}
          onSelect={onSelect}
        />
      </ScrollView>
      <ValidationFeedback {...validity} />
      <View>
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </View>
  );
};

export default PostExclusiveContentsForm;
