import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTE_NAMES } from '@routes/home';
import { QrScanner } from '@routes/home/AccountsImport/QrCodeScanner';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import React, { useState } from 'react';
import { Account } from 'types/account';

const AccountImportScreen = ({}: NativeStackScreenProps<any>) => {
  const { setAccounts } = useAccounts();
  const [findedAccounts, setFindedAccounts] = useState<Account[]>();

  const onCodeFinded = (value: string) => {
    if (isValid(value)) {
      setAccounts(JSON.parse(value));
      navigate(ROUTE_NAMES.ACCOUNTS_LIST);
      showToastMessage(AppMessageType.SUCCESS, 'Account importati con successo!');
    }
  };

  const strToJson = (str: string): Object | undefined => {
    try {
      return JSON.parse(str);
    } catch (e) {
      return;
    }
  };

  const isValid = (value: string) => {
    const obj = strToJson(value);
    return !(!obj || !Array.isArray(obj) || !obj.length || !Object.keys(obj[0]).includes('email'));
  };

  return (
    <PageContainer noMargin customHeader={<CustomHeader title={'Importa Account'} />}>
      <QrScanner onCodeFinded={onCodeFinded} />
    </PageContainer>
  );
};

export { AccountImportScreen };
