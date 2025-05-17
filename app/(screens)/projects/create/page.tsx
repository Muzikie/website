import React, {FC} from 'react';

import {ScrollView} from '@/app/components/Polyfills';
import {SafeArea} from '@/app/components/Elements';
import Form from '@/app/components/Forms/Project/Create';
import ConnectWalletButton from '@/app/components/Wallet/ConnectWalletButton';

const ProjectCreateScreen: FC = async () => (
  <SafeArea>
    <ScrollView className="w-full h-full p-4">
      <ConnectWalletButton />
      <Form />
    </ScrollView>
  </SafeArea>
);

export default ProjectCreateScreen;
