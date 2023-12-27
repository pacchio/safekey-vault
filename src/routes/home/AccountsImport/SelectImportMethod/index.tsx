import { CustomButton, CustomRow, CustomText, CustomView } from '@components/atoms';
import { CustomHeader } from '@components/molecules';
import CustomMenuItem from '@components/molecules/CustomMenuItem';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTE_NAMES } from '@routes/home';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import { FONT_SIZE_BIG } from '@styles/typography';
import { decryptAccounts } from '@utils/accountsEncryptionUtils';
import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const AccountImportScreen = ({}: NativeStackScreenProps<any>) => {
  const { setAccounts } = useAccounts();

  const proceedWithScanning = () => {
    navigate(ROUTE_NAMES.ACCOUNT_IMPORT_QR_CODE_SCANNER);
  };

  const importFromFile = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      const data = await RNFS.readFile(pickedFile.uri);
      await importAccountsFromData(data);
    } catch (err) {
      console.log('Error while importing from file', err);
    }
  };

  const importAccountsFromData = async (value: string) => {
    const accountsValidated = await decryptAccounts(value);
    if (accountsValidated) {
      setAccounts(accountsValidated);
      navigate(ROUTE_NAMES.ACCOUNTS_LIST);
      showToastMessage(AppMessageType.SUCCESS, 'Account importati con successo!');
    }
  };

  return (
    <PageContainer noMargin customHeader={<CustomHeader title={'Seleziona un metodo'} />}>
      <CustomView center marginVertical>
        <CustomText size={FONT_SIZE_BIG} center>
          Scegli come importare i tuoi account
        </CustomText>
      </CustomView>
      <CustomMenuItem
        title={'Qr code'}
        description={
          "Scarica l'app SafeKey Vault sul vecchio dispositivo.\nNell'app, vai su 'Esporta', ottieni il QR code da scansionare e procedi con la scansione con questo dispositivo."
        }
        descriptionColor={'gray'}
        onPress={proceedWithScanning}
      />
      <CustomMenuItem
        title={'Da file'}
        description={
          "Scarica l'app SafeKey Vault sul vecchio dispositivo.\nNell'app, vai su 'Esporta', esporta i dati su file e utilizza quel file per procedere con l'importazione su questo dispositivo."
        }
        descriptionColor={'gray'}
        onPress={importFromFile}
      />
    </PageContainer>
  );
};

export { AccountImportScreen };
