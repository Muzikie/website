'use client';

import React, {useState, FC, useEffect} from 'react';
import {useRouter} from 'next/navigation';

import {validateForm} from '@/app/utils/validators';
import {ProjectAttrs, ProjectType} from '@/app/components/Projects/types';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {View} from '@/app/components/Polyfills';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import SectionHeader from '@/app/components/SectionHeader';
import {Routes} from '@/app/config/routes';
import {FORMS} from '@/app/config/constants';
import {schema} from './schema';

const emptyFormValues = {
  name: '',
  summary: '',
  description: '',
  project_type: ProjectType.Single,
  planned_release_date: '',
  soft_goal: '0',
  hard_goal: '0',
  deadline: '',
};

const CreateProjectForm: FC = () => {
  const {push} = useRouter();
  const [data, setData] = useState<Partial<ProjectAttrs>>(emptyFormValues);
  const validity = validateForm(schema, data);

  const handleSubmit = () => {
    localStorage.setItem(FORMS.CREATE_PROJECT, JSON.stringify(data));
    push(`${Routes.Projects}/create/review`)
  };

  const handleCancel = () => {
    push(Routes.Home);
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(FORMS.CREATE_PROJECT) || '{}');
      const isValid = validateForm(schema, stored);
      if (isValid) {
        setData(stored);
      }
    } catch (error) {
      console.log('NO_VALID_STATE', error);
    }
  }, []);

  return (
    <>
      <SectionHeader
        title="Let the world know"
        subtitle="and receive love and support"
      />
      <View>
        <Input
          placeholder="Name"
          onChange={onChange}
          value={data.name}
          name="name"
        />
        <Input
          placeholder="Summary (70-140 characters)"
          onChange={onChange}
          value={data.summary}
          name="summary"
          multiline
        />
        <Input
          placeholder="Description (Min 140 characters)"
          onChange={onChange}
          value={data.description}
          name="description"
          multiline
        />
        <Input
          placeholder="Planned release date (YYYY-MM-DD)"
          onChange={onChange}
          value={data.planned_release_date}
          name="planned_release_date"
        />
        <Input
          placeholder={`Soft goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={data.soft_goal}
          name="soft_goal"
          inputMode="decimal"
        />
        <Input
          placeholder={`Hard goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
          onChange={onChange}
          value={data.hard_goal}
          name="hard_goal"
          inputMode="decimal"
        />
        <Input
          placeholder="Funding deadline (YYYY-MM-DD)"
          onChange={onChange}
          value={data.deadline}
          name="deadline"
        />
      </View>
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
    </>
  );
};

export default CreateProjectForm;
