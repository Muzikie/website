import React, {FC} from 'react';

import {SafeArea} from '@/app/components/Elements';
import FormSteps from '@/app/components/FormElements/FormSteps';
import Form from '@/app/components/Forms/Project/Create';
import Review from '@/app/components/Forms/Project/Create/Review';
import ConnectWalletButton from '@/app/components/Wallet/ConnectWalletButton';
import {createProject} from '@/app/actions/createProject';

const ProjectCreateScreen: FC = async () => (
  <SafeArea>
    <ConnectWalletButton />
    <FormSteps
      Form={Form}
      Review={Review}
      submit={createProject}
    />
  </SafeArea>
);

export default ProjectCreateScreen;
