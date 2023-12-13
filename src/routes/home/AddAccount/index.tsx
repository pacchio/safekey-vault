import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountForm } from '@routes/home/shared/AccountForm';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import React, { useRef } from 'react';
import { Keyboard } from 'react-native';
import 'react-native-get-random-values';
import { Account } from 'types/account';

import { ROUTE_NAMES } from '../routes';

const AddAccountScreen = ({}: NativeStackScreenProps<any>) => {
  const { accounts, setAccounts } = useAccounts();
  const formComponent = useRef<{
    getAccountFromForm: () => Account;
  }>();

  const add = () => {
    const account = formComponent.current?.getAccountFromForm();
    if (!account) {
      return;
    }
    setAccounts([...accounts, account]);
    Keyboard.dismiss();
    showToastMessage(AppMessageType.SUCCESS, 'Account aggiunto con successo');
    navigate(ROUTE_NAMES.ACCOUNTS_LIST);
  };

  return (
    <PageContainer customHeader={<CustomHeader title={'Nuovo account'} confirm={() => add()} />}>
      <AccountForm ref={formComponent} />
    </PageContainer>
  );
};

export { AddAccountScreen };
