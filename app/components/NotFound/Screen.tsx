import React, {FC} from 'react';
import NextImage from 'next/image';

import {H4, View, Link} from '@/app/components/Polyfills';
import {Button, ButtonThemes} from '@/app/components/Elements';
import {Routes} from '@/app/config/routes';
import {ScreenNotFoundProps} from './types';
import cactus from '@/public/images/not-found.svg';

const ScreenNotFound: FC<ScreenNotFoundProps> = ({redirectTo}) => {
  const screen:Routes = (redirectTo && redirectTo in Routes) ? redirectTo : Routes.Home;

  return (
    <View className="w-full h-full flex flex-row justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <NextImage alt="Not Found" src={cactus} width={60} />
        <H4 className="mb-6 mt-4 text-neutralMighty">That&apos;s gone!</H4>

        {redirectTo !== false && (
          <Link to={{screen}} markActive={false}>
            <Button
              title="Back to home"
              theme={ButtonThemes.primary}
            />
          </Link>
        )}
      </View>
    </View>
  );
};
export default ScreenNotFound;
