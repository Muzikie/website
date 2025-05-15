'use client'

import React, {FC} from 'react';
import NextImage from 'next/image';

import {View, H3, Span, Link} from '@/app/components/Polyfills';
import {shareProjectInvitation} from '@/app/utils/shareMenu';
import {Button} from '@/app/components/Elements';
import {ButtonThemes} from '@/app/components/Elements/Button/types';
import successImage from '@/public/images/success.svg';
import errorImage from '@/public/images/error.svg';
import {withdraw} from '@/app/actions/withdraw';
import {
  DefaultProjectStatusProps,
  FullDataComponentProps,
  PublishedProjectOwnerProps,
  SuccessfulProjectOwnerProps,
} from './type';
import { Routes } from '@/app/config/routes';

export const EditProject: FC<DefaultProjectStatusProps> = ({projectId}) => (
  <View className="bg-primaryMild rounded-md p-4 mt-4">
    <H3 className="text-primaryMighty !font-normal pb-2">
      Now What?
    </H3>
    <Span className="text-neutralMighty">
      You Can edit your project if needed, and once ready, publish it.
    </Span>
    <View className="w-full pt-2">
      <Span className="text-neutralMighty !font-medium">
        You can add up to 5 contribution tiers.
      </Span>
    </View>
    <View className="flex flex-row justify-stretch gap-4 my-4">
      <Link to={{screen: `${Routes.Projects}/${projectId}/add-contribution-tier`}}>
        <Button
          title="Add contribution tier"
          theme={ButtonThemes.secondary}
        />
      </Link>
      <Link to={{screen: `${Routes.Projects}/${projectId}/edit`}}>
        <Button
          title="Edit"
          theme={ButtonThemes.secondary}
        />
      </Link>
      <Link to={{screen: `${Routes.Projects}/${projectId}/publish`}}>
        <Button
          title="Go live"
          theme={ButtonThemes.primary}
        />
      </Link>
    </View>
  </View>
);

export const SupportProject: FC<FullDataComponentProps> = ({
  account,
  project,
  artist,
}) => {
  return (
    <View className="bg-skyWeak p-4 rounded-md mt-6">
      <H3 className="text-primaryStrong !font-normal pb-2">
        Your time to shine
      </H3>
      <Span className="text-neutralSteady">
        You can now contribute in this project and become a part of it.
      </Span>
      <View className="w-full pt-2 pb-4">
        <Span className="text-neutralSteady !font-medium">
          Every small contribution matters.
        </Span>
      </View>
      <View className="flex flex-row justify-stretch gap-4">
        <Link className="grow" to={{screen: `${Routes.Projects}/${project.documentId}/contribute`}}>
          <Button
            className="w-full"
            title="Support"
            theme={ButtonThemes.secondary}
          />
        </Link>
        <Button
          title="Share"
          theme={ButtonThemes.secondary}
          onPress={() =>
            shareProjectInvitation(account, project, artist)
          }
        />
      </View>
    </View>
  );
};

export const PublishedProjectOwner: FC<PublishedProjectOwnerProps> = ({
  project,
  account,
  artist,
}) => (
  <View className="bg-skyWeak p-4 rounded-md mt-6">
    <H3 className="text-primaryStrong !font-normal pb-2">
      You can win this
    </H3>
    <Span className="text-neutralSteady">
      Your project is now published.
    </Span>
    <View className="w-full pt-2 pb-4">
      <Span className="text-neutralSteady !font-medium">
          Reach out to your fans in your socials and ask them to support you.
      </Span>
    </View>
    <Button
      title="Share"
      theme={ButtonThemes.secondary}
      onPress={() =>
        shareProjectInvitation(account, project, artist)
      }
    />
  </View>
);

export const SuccessfulProjectOwner: FC<SuccessfulProjectOwnerProps> = ({
  projectId, onChainId,
}) => {
  const onWithdraw = async () => {
    console.log('Withdraw', projectId);
    const res = await withdraw(projectId, onChainId);
    console.log('res', res);
  };

  return (
    <View className="bg-skyWeak p-4 rounded-md mt-6">
      <H3 className="text-primaryStrong !font-normal pb-2">Successful</H3>
      <Span className="text-neutralSteady">
        Your project has successfully raised funds. Now is the time to shine!
      </Span>
      <View className="w-full pt-2 pb-4">
        <Span className="text-neutralSteady">
          Once ready, you can post updates to deliver your promise.
        </Span>
      </View>
      <NextImage alt="Successful" src={successImage} className="w-[80px] pb-4" />
      <View className="flex flex-row justify-stretch gap-4">
        <Link className="grow flex" to={{screen: `${Routes.Projects}/${projectId}/post-exclusive-content`}}>
          <Button
            title="Post exclusive content"
            theme={ButtonThemes.secondary}
          />
        </Link>
        <Button
          title="Withdraw"
          theme={ButtonThemes.secondary}
          onPress={onWithdraw}
        />
      </View>
    </View>
  );
};

export const SuccessfulProjectContributor: FC = () => (
  <View className="bg-skyWeak p-4 rounded-md mt-6">
    <H3 className="text-primaryStrong !font-normal pb-2">Successful</H3>
    <Span className="text-neutralSteady">
      This project has successfully raised funds. Once ready, The artist will
      publish updates to deliver your rewards.
    </Span>
    <NextImage alt="Successful" src={successImage} className="w-[80px] py-4" />
  </View>
);

export const FailingProjectOwner: FC = () => (
  <View className="bg-amberWeak p-4 rounded-md mt-6">
    <H3 className="text-primaryStrong !font-normal pb-2">We are Sorry</H3>
    <Span className="text-neutralSteady">
      This project did not raise the required funds.
    </Span>
    <NextImage alt="Failed" src={errorImage} className="w-[60px] py-4" />
  </View>
);
