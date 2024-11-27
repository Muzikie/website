'use client'

import React, {FC, useState} from 'react';
import {useRouter} from 'next/navigation';

// import {mapObject} from '@/app/utils/convertors';
import {validateForm} from '@/app/utils/validators';
import {ProjectAttrs, ProjectType} from '@/app/components/Projects/types';
import {View, ScrollView} from '@/app/components/Polyfills';
import ValidationFeedback from '@/app/components/FormElements/ValidationFeedback';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button, Input} from '@/app/components/Elements';
import {Routes} from '@/app/config/routes';
import type {EditProjectFormProps} from './types';
import {schema} from './schema';

const emptyFormValues = {
  name: '',
  summary: '',
  description: '',
  project_type: ProjectType.Single,
  planned_release_date: '',
  soft_goal: 0,
  deadline: '',
  hard_goal: 0,
}

const EditProjectForm: FC<EditProjectFormProps> = ({
  initialData, onProceed, projectId,
}) => {
  const {push} = useRouter();
  // we have to reshape initial data
  const [data, setData] = useState<Partial<ProjectAttrs>>(
    initialData || emptyFormValues,
  );
  const validity = validateForm(schema, data);

  const handleSubmit = async () => {
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

  // useEffect(() => {
  //   if (existingData?.data && !isLoading) {
  //     setData(
  //       mapObject(existingData.data.attributes, [
  //         'name',
  //         'summary',
  //         'description',
  //         'project_type',
  //         'planned_release_date',
  //         'soft_goal',
  //         'deadline',
  //         'hard_goal',
  //       ]),
  //     );
  //   }
  // }, [existingData, isLoading]);

  return (
    <ScrollView className="w-full h-full p-4">
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
        value={String(data.soft_goal)}
        name="soft_goal"
        inputMode="numeric"
      />
      <Input
        placeholder={`Hard goal (in ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL})`}
        onChange={onChange}
        value={String(data.hard_goal)}
        name="hard_goal"
        inputMode="numeric"
      />
      <Input
        placeholder="Funding deadline (YYYY-MM-DD)"
        onChange={onChange}
        value={data.deadline}
        name="deadline"
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
          disabled={!validity.isValid || !projectId}
        />
      </View>
    </ScrollView>
  );
};

export default EditProjectForm;
