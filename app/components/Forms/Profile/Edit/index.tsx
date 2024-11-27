'use client'

import React, {useState} from 'react';
import {TextInput, View} from '@/app/components/Polyfills';

import {useModal} from '@/app/hooks/useModal';
import {useAccount} from '@/app/hooks/useAccount';
import {Profile} from '@/app/context/accountContext/types';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Button} from '@/app/components/Elements';
import EditProfileReview from './Review';

const EditProfileForm = () => {
  const {account} = useAccount();
  const [data, setData] = useState<Partial<Profile>>({
    first_name: account?.first_name ?? '',
    last_name: account?.last_name ?? '',
  });
  const {show} = useModal();

  const onSubmit = async () => {
    // Keyboard.dismiss();
    show({
      title: 'Looking good!',
      description: '',
      content: <EditProfileReview data={data} />,
    });
  };

  const onChange = (fieldName: string) => (value: string) => {
    setData({
      ...data,
      [fieldName]: value,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Your name?"
        onChangeText={onChange('first_name')}
        value={data.first_name}
        placeholderTextColor="#333"
      />
      <TextInput
        placeholder="And your last name?"
        onChangeText={onChange('last_name')}
        value={data.last_name}
        placeholderTextColor="#333"
      />
      <View className="flex flex-row justify-center">
        <Button
          title="Continue"
          theme={ButtonThemes.primary}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default EditProfileForm;
