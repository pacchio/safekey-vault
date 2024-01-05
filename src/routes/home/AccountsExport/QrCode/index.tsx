import { CustomText, CustomView } from '@components/atoms';
import { CustomHeader } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { MAX_EXPORTABLE } from '@constants/index';
import { useAccounts } from '@hooks/useAccounts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Spacing } from '@styles/index';
import { FONT_SIZE_BIG } from '@styles/typography';
import { encryptAccounts } from '@utils/accountsEncryptionUtils';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { ROUTE_NAMES } from '../../routes';

export type ParamsList = {
  [ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE]: { ids?: string[] };
};

const QrCodeScreen = ({
  route: {
    params: { ids },
  },
}: NativeStackScreenProps<ParamsList, typeof ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE>) => {
  const { accounts } = useAccounts();
  const [accountsToExport, setAccountsToExport] = useState('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    const boot = async () => {
      if (isExportableWithQR()) {
        setAccountsToExport(await encryptAccounts(accounts));
      } else if (ids) {
        const _accounts = accounts.filter((a) => ids.includes(a.id));
        setAccountsToExport(await encryptAccounts(_accounts));
      }
    };
    boot();
  }, [accounts, ids]);

  const isExportableWithQR = () => {
    return accounts.length > 0 && accounts.length <= MAX_EXPORTABLE;
  };

  return (
    <PageContainer customHeader={<CustomHeader title={'Esporta Account'} />} useScrollView={false} useSafeArea={true}>
      <CustomView center>
        <CustomView>
          <CustomText size={FONT_SIZE_BIG}>Scansiona questo codice QR</CustomText>
        </CustomView>
        <CustomView marginVertical>
          <CustomText center>
            Scarica l'app SafeKey Vault sul nuovo dispositivo.{'\n'}Nell'app, vai su 'Importa' e scansiona questo codice
            QR.
          </CustomText>
        </CustomView>
        {!!accountsToExport && (
          <CustomView paddingVertical paddingHorizontal backgroundColor={'white'}>
            <QRCode value={accountsToExport} ecl={'L'} size={width - Spacing.MARGIN_FROM_BOARD * 2} />
          </CustomView>
        )}
      </CustomView>
    </PageContainer>
  );
};

export { QrCodeScreen };
