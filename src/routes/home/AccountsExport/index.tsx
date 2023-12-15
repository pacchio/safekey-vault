import { CustomText, CustomView } from '@components/atoms';
import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

const AccountExportScreen = ({}: NativeStackScreenProps<any>) => {
  const { accounts } = useAccounts();

  return (
    <PageContainer customHeader={<CustomHeader title={'Esporta Account'} />}>
      <CustomView>
        <CustomText>Export account</CustomText>
      </CustomView>
    </PageContainer>
  );
};

export { AccountExportScreen };
