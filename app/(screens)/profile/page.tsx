// Set dynamic rendering for this page
export const dynamic = 'force-dynamic';

import React from 'react';
import { ScrollView } from '@/app/components/Polyfills';
import Contributions from '@/app/components/Profile/Contributions';
import { SafeArea } from '@/app/components/Elements';
import Basics from '@/app/components/Profile/Basics';

const ProfilePage = async () => (
  <SafeArea>
    <ScrollView>
      <Basics />
      <Contributions />
    </ScrollView>
  </SafeArea>
);

export default ProfilePage;
