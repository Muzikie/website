'use client';

import React, {FC, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ethers, parseUnits} from 'ethers';

import {View, ScrollView} from '@/app/components/Polyfills';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {Button} from '@/app/components/Elements';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import Feedback from '@/app/components/Feedback';
import {ProjectAttrs} from '@/app//components/Projects/types';
import {Routes} from '@/app/config/routes';
import {FORMS} from '@/app/config/constants';
import {createProject} from '@/app/actions/createProject';
import {ProjectType} from '@/app/components/Projects/types';
import {useWallet} from '@/app/components/Wallet/useWallet';
import MELODYNE_ABI from '@/app/config/melodyneAbi.json';

const CreateProjectReview: FC = () => {
  const {push} = useRouter();
  const {sendTransaction} = useWallet();
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: '',
  });
  const [data, setData] = useState<ProjectAttrs>({
    name: '',
    summary: '',
    description: '',
    project_type: ProjectType.Single,
    planned_release_date: '',
    soft_goal: '0',
    deadline: '',
    hard_goal: '0',
    on_chain_id: '',
  });
  const handleSubmit = async () => {
    try {
      const deadline = Math.floor(new Date(data.planned_release_date as string).getTime() / 1000);
      const goal = parseUnits(data.soft_goal.toString(), 6);
      const hardCap = parseUnits(data.hard_goal.toString(), 6);
      const {id: campaignId} = await sendTransaction('createCampaign', [goal, hardCap, deadline], 'CampaignCreated');

      if (!campaignId) throw new Error('Could not find CampaignCreated event');

      const res = await createProject({
        ...data,
        on_chain_id: campaignId,
      });
      console.log('res : ', res);
      if (!res.success) {
        throw new Error(res.error);
      }

      localStorage.removeItem(FORMS.CREATE_PROJECT)

      setFeedback({
        status: FetchStatus.Success,
        message: '',
      });
    } catch (e) {
      setFeedback({
        status: FetchStatus.Error,
        message: e.message,
      });
      console.error('Error creating the project:', e);
    }
  };

  const handleEdit = () => {
    push(`${Routes.Projects}/create`);
  };

  useEffect(() => {
    try {
      const storedData =
        localStorage.getItem(FORMS.CREATE_PROJECT) || '';
      const parsedData = JSON.parse(storedData) as ProjectAttrs;
      setData(parsedData);
    } catch (error) {
      console.log('NO_VALID_STATE', error);
    }
  }, []);

  const formattedValue = {
    ...data,
    soft_goal: `${data?.soft_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
    hard_goal: `${data?.hard_goal} ${process.env.NEXT_PUBLIC_TOKEN_SYMBOL}`,
  };

  return (
    <ScrollView className="w-full h-full p-4">
      <FormSummary data={formattedValue} />
      <View className="flex flex-row justify-center gap-4">
        <Button
          title={'Edit'}
          theme={ButtonThemes.secondary}
          onPress={handleEdit}
        />
        <Button
          title={SubmitTitle[feedback.status]}
          theme={ButtonThemes.primary}
          disabled={feedback.status !== FetchStatus.Idle}
          onPress={handleSubmit}
        />
      </View>
      <Feedback {...feedback} />
    </ScrollView>
  );
};

export default CreateProjectReview;
