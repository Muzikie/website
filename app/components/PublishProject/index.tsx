'use client'

import React, {FC, useState} from 'react';
import {ethers} from 'ethers';

import {View, H2, Span, Link, ScrollView} from '@/app/components/Polyfills';
import FormSummary from '@/app/components/FormElements/GenericSummary';
import {publishProject} from '@/app/actions/publishProject';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import {Routes} from '@/app/config/routes';
import {FetchStatus, SubmitTitle} from '@/app/config/types';
import Feedback from '@/app/components/Feedback';
import {PublishProjectProps} from './types';
import {useWallet} from '../Wallet/useWallet';

const PublishProject: FC<PublishProjectProps> = ({projectId, data, onchainId}) => {
  const {sendTransaction} = useWallet();
  const [feedback, setFeedback] = useState({
    status: FetchStatus.Idle,
    message: '',
  })
  const handlePublish = async () => {
    setFeedback({
      status: FetchStatus.Pending,
      message: '',
    });

    try {
      await sendTransaction('publishCampaign', [onchainId], 'CampaignPublished');
      const result = await publishProject(projectId);
      setFeedback({
        status: result.success ? FetchStatus.Success : FetchStatus.Error,
        message: result.error,
      });
      console.log('res', result)
    } catch (e) {
      setFeedback({
        status: FetchStatus.Error,
        message: e.message,
      });
    }
  };

  return (
    <ScrollView>
      <View className="p-4">
        <H2 className="dark:!text-primaryStrong">
          Review and publish
        </H2>
        <Span className="mb-4 !font-light dark:!text-neutralStrong">
          Ensure everything is fine before your go live
        </Span>

        <FormSummary data={data} />

        <View className="flex flex-row justify-stretch gap-4 my-4">
          <Link to={{screen: `${Routes.Projects}/${projectId}`}} className="grow">
            <Button
              title="Cancel"
              theme={ButtonThemes.secondary}
              className="w-full"
            />
          </Link>
          <Button
            title={SubmitTitle[feedback.status]}
            theme={ButtonThemes.primary}
            onPress={handlePublish}
          />
        </View>
        <Feedback {...feedback} />
      </View>
    </ScrollView>
  );
};

export default PublishProject;
