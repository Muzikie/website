// Set dynamic rendering for this page
export const dynamic = 'force-dynamic';

import React from 'react';
import {ScrollView} from '@/app/components/Polyfills';
import {SafeArea} from '@/app/components/Elements';
import {Overview} from '@/app/components/Profile/Overview';

const ProfilePage = async () => (
  <SafeArea>
    <ScrollView className="p-6">
      <Overview />
    </ScrollView>
  </SafeArea>
);

export default ProfilePage;
