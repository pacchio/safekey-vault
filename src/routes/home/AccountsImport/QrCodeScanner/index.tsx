import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTE_NAMES } from '@routes/home';
import { QrScanner } from '@routes/home/AccountsImport/QrCodeScanner/QrCodeScanner';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import { decryptAccounts } from '@utils/accountsEncryptionUtils';
import React from 'react';

const AccountImportScanQrScreen = ({}: NativeStackScreenProps<any>) => {
  const { setAccounts } = useAccounts();

  const onCodeFinded = async (value: string) => {
    const accountsValidated = await decryptAccounts(value);
    if (accountsValidated) {
      setAccounts(accountsValidated);
      navigate(ROUTE_NAMES.ACCOUNTS_LIST);
      showToastMessage(AppMessageType.SUCCESS, 'Account importati con successo!');
    }
  };

  return (
    <PageContainer noMargin customHeader={<CustomHeader title={'Scan QR code'} />}>
      <QrScanner onCodeFinded={onCodeFinded} />
    </PageContainer>
  );
};

export { AccountImportScanQrScreen };
