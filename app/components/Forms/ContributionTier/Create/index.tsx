'use client';

import React, {FC, useState} from 'react';
import {useRouter} from 'next/navigation';

import SectionHeader from '@/app/components/SectionHeader';
import {View, ScrollView} from '@/app/components/Polyfills';
import {validateForm} from '@/app/utils/validators';
import {ContributionTierAttrs} from '@/app/components/Projects/types';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import {Routes} from '@/app/config/routes';
import type {ContributionTier} from './types';
import {schema} from './schema';

const emptyFormValues = {
  name: '',
  description: '',
  rewards: '',
  amount: 0,
}

const CreateContributionTierForm: FC<ContributionTier> = ({
  initialData, onProceed, projectId,
}) => {
  const {push} = useRouter();
  const [data, setData] = useState<Partial<ContributionTierAttrs>>(
    initialData || emptyFormValues,
  );
  console.log('projectId', projectId);

 const validity = validateForm(schema, data);

 const handleSubmit = () => {
    onProceed(data);
  };

  const handleCancel = () => {
    push(`${Routes.Projects}/${projectId}`);
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title="Add a contribution tier"
        subtitle="Define contribution amount, and the awards you will give fans"
      />
      <Input
        placeholder="Name"
        onChange={onChange}
        value={data.name}
        name="name"
      />
      <Input
        placeholder="Description (10-100 characters)"
        onChange={onChange}
        value={data.description}
        name="description"
        multiline
      />
      <Input
        placeholder="Rewards (Min 140 characters)"
        onChange={onChange}
        value={data.rewards}
        name="rewards"
        multiline
      />
      <Input
        placeholder={`Amount (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
        onChange={onChange}
        value={data.amount}
        name="amount"
        inputMode="decimal"
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
          onPress={handleSubmit}
          disabled={!validity.isValid}
        />
      </View>
    </ScrollView>
  );
};

export default CreateContributionTierForm;
