import { CustomText, CustomView } from '@components/atoms';
import { CustomHeader } from '@components/molecules';
import CustomMenuItem from '@components/molecules/CustomMenuItem';
import { PageContainer } from '@components/organisms';
import { MAX_EXPORTABLE } from '@constants/index';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTE_NAMES } from '@routes/home';
import { FONT_SIZE_BIG } from '@styles/typography';
import { encryptAccounts } from '@utils/accountsEncryptionUtils';
import { toBase64 } from '@utils/commonFunctions';
import React, { useEffect, useState } from 'react';
import Share from 'react-native-share';

const SelectExportMethodScreen = ({}: NativeStackScreenProps<any>) => {
  const { accounts } = useAccounts();
  const [accountsToExport, setAccountsToExport] = useState('');

  useEffect(() => {
    const boot = async () => {
      setAccountsToExport(await encryptAccounts(accounts));
    };
    boot();
  }, [accounts]);

  const exportData = async () => {
    try {
      await Share.open({
        title: 'Condividi',
        message: 'Account da esportare',
        filename: 'safekeyvault-exported-data',
        url: `data:text/plain;base64,${toBase64(accountsToExport)}`,
      });
    } catch (err: any) {
      console.log('Error while sharing', err);
    }
  };

  const proceedWithQrCode = () => {
    if (isExportableWithQR()) {
      navigate(ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE);
    } else {
      navigate(ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_ACCOUNTS_FOR_QRCODE);
    }
  };

  const isExportableWithQR = () => {
    return accounts.length > 0 && accounts.length <= MAX_EXPORTABLE;
  };

  return (
    <PageContainer noMargin customHeader={<CustomHeader title={'Seleziona un metodo'} />}>
      <CustomView center marginVertical>
        <CustomText size={FONT_SIZE_BIG} center>
          Scegli come esportare i tuoi account
        </CustomText>
      </CustomView>
      <CustomMenuItem
        title={'Qr code'}
        description={'Ottieni un codice QR da scannerizzare per importare i tuoi account sul nuovo dispositivo'}
        descriptionColor={'gray'}
        onPress={proceedWithQrCode}
      />
      <CustomMenuItem
        title={'Su file'}
        description={"Esporta i dati su file e utilizza il file per procedere con l'importazione sul nuovo dispositivo"}
        descriptionColor={'gray'}
        onPress={exportData}
      />
    </PageContainer>
  );
};

export { SelectExportMethodScreen };
