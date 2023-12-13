import { CustomText } from '@components/atoms/CustomText';
import { PageContainer } from '@components/organisms';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

const SlidersListScreen = ({}: NativeStackScreenProps<any>) => {
  return (
    <>
      <PageContainer>
        <CustomText>SLIDERS LIST SCREEN</CustomText>
      </PageContainer>
    </>
  );
};

export { SlidersListScreen };
