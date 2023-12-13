import { CustomRow, CustomView } from '@components/atoms';
import { CustomText } from '@components/atoms/CustomText';
import { PasscodeInput } from '@components/molecules/PasscodeInput';
import { PageContainer } from '@components/organisms';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FONT_SIZE_BIG } from '@styles/typography';
import React, { useEffect, useState } from 'react';
import { ROUTE_NAMES } from './routes';

const PasscodeSetUpScreen = ({}: NativeStackScreenProps<any>) => {
  const [passcodeValue, setPasscodeValue] = useState<string>();

  useEffect(() => {
    if (passcodeValue?.length === 6) {
      navigate(ROUTE_NAMES.PASSCODE_SETUP_CONFIRM);
    }
  }, [passcodeValue]);

  return (
    <>
      <PageContainer>
        <CustomRow center>
          <CustomText bold size={FONT_SIZE_BIG}>
            Setup del codice di accesso
          </CustomText>
        </CustomRow>
        <CustomRow center marginTop marginBottom={20}>
          <CustomText>Crea il tuo codice di accesso personale</CustomText>
        </CustomRow>
        <CustomView marginTop={20}>
          <CustomRow center>
            <PasscodeInput autofocus passwordLength={6} onChange={(pc) => setPasscodeValue(pc)} />
          </CustomRow>
        </CustomView>
      </PageContainer>
    </>
  );
};

export { PasscodeSetUpScreen };
