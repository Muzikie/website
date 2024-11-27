'use client'

import React, {FC, useState} from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import SectionHeader from '@/app/components/SectionHeader';
import Feedback from '@/app/components/Feedback';
import {contribute} from '@/app/actions/contribute';
import {FetchStatus} from '@/app/config/types';
import {ContributeProps} from './types';
import Option from './Option';

const SubmitTitle = {
  [FetchStatus.Idle]: 'Submit',
  [FetchStatus.Pending]: 'Submitting',
  [FetchStatus.Error]: 'Failed',
  [FetchStatus.Success]: 'Succeeded',
};

const Contribute: FC<ContributeProps> = ({project, artist, options}) => {
  const [selected, setSelected] = useState<number>(0);
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: ','
  });

  const handleSubmit = async () => {
    setFeedback({
      status: FetchStatus.Pending,
      message: '',
    });
    const optionData = options.find(item => item.id === selected);
    const result = await contribute(optionData?.id ?? 0);
    setFeedback({
      status: result.success ? FetchStatus.Success : FetchStatus.Error,
      message: result.error,
    });
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title={`Support ${artist.attributes.first_name}`}
        subtitle={`You are contributing to "${project.attributes.name}"`}
      />
      <View>
        {options.map(item => (
          <Option
            key={`${item.id}${item.attributes.name}`}
            data={item}
            selected={selected === item.id}
            onSelected={setSelected}
          />
        ))}
      </View>
      <Button
        title={SubmitTitle[feedback.status]}
        theme={ButtonThemes.primary}
        onPress={handleSubmit}
        disabled={feedback.status !== FetchStatus.Idle}
      />
      <Feedback {...feedback} />
    </ScrollView>
  );
};

export default Contribute;
