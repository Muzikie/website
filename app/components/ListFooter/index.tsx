import React from 'react';
import {View, ActivityIndicator} from '@/app/components/Polyfills';

export const ListFooter = ({isLoading}: {isLoading: boolean}) => {
  return (
    <View>
      <ActivityIndicator
        size="large"
        color={
          isLoading ? '#FEEAE3' : '#4E344D'
        }
      />
    </View>
  );
};

export default ListFooter;
