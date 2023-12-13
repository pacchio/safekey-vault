import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountForm } from '@routes/home/shared/AccountForm';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import * as _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { Account } from 'types/account';
import { ROUTE_NAMES } from '../routes';

export type ParamsList = {
  [ROUTE_NAMES.ACCOUNT_DETAIL]: { id: string };
};

const AccountDetailScreen = ({
  route: {
    params: { id },
  },
}: NativeStackScreenProps<ParamsList, typeof ROUTE_NAMES.ACCOUNT_DETAIL>) => {
  const { accounts, setAccounts } = useAccounts();
  const [account, setAccount] = useState<Account>();

  const formComponent = useRef<{
    getAccountFromForm: () => Account;
  }>();

  useEffect(() => {
    setAccount(accounts.find((a) => a.id === id));
  }, [accounts]);

  const update = () => {
    const newAccount = formComponent.current?.getAccountFromForm();
    if (!newAccount) {
      return;
    }
    const index = accounts.findIndex((a) => a.id === newAccount.id);
    if (index === -1) {
      return;
    }
    const _accounts = _.cloneDeep(accounts);
    _accounts[index] = newAccount;
    setAccounts(_accounts);
    Keyboard.dismiss();
    showToastMessage(AppMessageType.SUCCESS, 'Account aggiornato con successo');
    navigate(ROUTE_NAMES.ACCOUNTS_LIST);
  };

  return (
    <PageContainer customHeader={<CustomHeader title={account?.title ?? 'Account'} confirm={() => update()} />}>
      <AccountForm ref={formComponent} account={account} />
    </PageContainer>
  );
};

export { AccountDetailScreen };
