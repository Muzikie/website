'use client'

import React, {FC, useState} from 'react';

import {View, ScrollView} from '@/app/components/Polyfills';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import SectionHeader from '@/app/components/SectionHeader';
import Feedback from '@/app/components/Feedback';
import {contribute} from '@/app/actions/contribute';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import {ContributeProps} from './types';
import Option from './Option';

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
    const result = await contribute(optionData.documentId);
    setFeedback({
      status: result.success ? FetchStatus.Success : FetchStatus.Error,
      message: result.error,
    });
  };

  // @todo update account balance (fetch from Klayr blockchain)
  // @todo disable submit button if account balance is less than the contribution amount

  return (
    <ScrollView className="w-full h-full p-4">
      <SectionHeader
        title={`Support ${artist.first_name}`}
        subtitle={`You are contributing to "${project.name}"`}
      />
      <View>
        {options.map(item => (
          <Option
            key={`${item.id}${item.name}`}
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
