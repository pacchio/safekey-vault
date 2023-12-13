import { CustomRow, CustomView } from '@components/atoms';
import { CustomText } from '@components/atoms/CustomText';
import { PasscodeInput } from '@components/molecules/PasscodeInput';
import { PageContainer } from '@components/organisms';
import { KEYS, useUserStorage } from '@hooks/useStorage';
import { useBiometrics } from '@hooks/useBiometrics';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showAlert } from '@services/AlertService';
import { user } from '@store/slices';
import { FONT_SIZE_BIG } from '@styles/typography';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ROUTE_NAMES } from './routes';

const PasscodeSetUpConfirmScreen = ({}: NativeStackScreenProps<any>) => {
  const [passcode, setPasscode] = useUserStorage(KEYS.PASSCODE);
  const [passcodeValue, setPasscodeValue] = useState<string>('');
  const { available: isBiometricsAvailable } = useBiometrics();
  const dispatch = useDispatch();

  const confirm = () => {
    showAlert(
      'Attenzione',
      'Dovrai ricordare questo passcode per i prossimi accessi. Confermi di voler procedere?',
      () => {
        setPasscode(passcodeValue);
        if (isBiometricsAvailable) {
          navigate(ROUTE_NAMES.BIOMETRIC_REGISTRATION);
        } else {
          dispatch(user.actions.setInLoggedIn(true));
        }
      },
    );
  };

  useEffect(() => {
    if (passcodeValue?.length === 6) {
      confirm();
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
          <CustomText>Digita di nuovo il codice per confermare</CustomText>
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

export { PasscodeSetUpConfirmScreen };
