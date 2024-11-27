import React, {FC} from 'react';

import {Image} from '@/app/components/Polyfills';
import {SafeArea} from '@/app/components/Elements';

const PictureScreen: FC = async ({searchParams}) => {
  const awaitedSearchParams = await searchParams;

  return (
    <SafeArea>
      <Image alt="Project photo" source={awaitedSearchParams.url} />
    </SafeArea>
  );
};

export default PictureScreen;
