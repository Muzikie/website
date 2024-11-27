import React from 'react';

import Logout from '@/app/components/Logout';
import {SafeArea} from '@/app/components/Elements';

const LogoutScreen = async () => (
  <SafeArea className="flex flex-col justify-center items-center">
    <Logout />
  </SafeArea>
);

export default LogoutScreen;
