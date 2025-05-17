import React, {FC} from 'react';

import {SafeArea} from '@/app/components/Elements';
import Review from '@/app/components/Forms/Project/Create/Review';

const ProjectCreateScreen: FC = async () => (
  <SafeArea>
    <Review  />
  </SafeArea>
);

export default ProjectCreateScreen;
