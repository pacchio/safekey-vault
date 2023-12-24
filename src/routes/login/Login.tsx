import { CustomButton, CustomRow, CustomView, CustomViewBottom } from '@components/atoms';
import { CustomText } from '@components/atoms/CustomText';
import { PasscodeInput } from '@components/molecules/PasscodeInput';
import { PageContainer } from '@components/organisms';
import { useBiometrics } from '@hooks/useBiometrics';
import { KEYS, useUserStorage } from '@hooks/useStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import { user } from '@store/slices';
import { FONT_SIZE_BIG } from '@styles/typography';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginScreen = ({}: NativeStackScreenProps<any>) => {
  const [passcode, setPasscode, clearAll] = useUserStorage(KEYS.PASSCODE);
  const [passcodeValue, setPasscodeValue] = useState<string>();
  const { available, biometryType, simplePrompt } = useBiometrics();
  const dispatch = useDispatch();

  const tryLoginWithBiometrics = async () => {
    try {
      const { success, error } = await simplePrompt();
      if (error) {
        showToastMessage(AppMessageType.ERROR, error);
      } else if (success) {
        login();
      }
    } catch (e: any) {
      showToastMessage(AppMessageType.ERROR, 'Errore generico durante la verifica: ' + e.toString());
    }
  };

  const tryLoginWithPasscode = () => {
    if (passcode === passcodeValue) {
      login();
    } else {
      showToastMessage(AppMessageType.ERROR, 'Passcode non corretto');
    }
  };

  const login = () => {
    dispatch(user.actions.setInLoggedIn(true));
  };

  useEffect(() => {
    if (passcodeValue?.length === 6) {
      tryLoginWithPasscode();
    }
  }, [passcodeValue]);

  /* ========== DEBUG =========== */
  const clearAllData = () => {
    clearAll();
    showToastMessage(AppMessageType.SUCCESS, 'Dati eliminati con successo');
  };

  return (
    <PageContainer>
      <CustomRow center marginTop marginBottom={20}>
        <CustomText size={FONT_SIZE_BIG}>Inserisci il codice per accedere</CustomText>
      </CustomRow>
      <CustomView marginTop={20}>
        <CustomRow center>
          <PasscodeInput passwordLength={6} onChange={(pc) => setPasscodeValue(pc)} />
        </CustomRow>
      </CustomView>
      {available && (
        <CustomRow marginTop={20}>
          <CustomButton full color={'primary'} title={`Usa ${biometryType}`} onClick={tryLoginWithBiometrics} />
        </CustomRow>
      )}
      {/* ========== DEBUG =========== */}
      <CustomViewBottom>
        <CustomRow>
          <CustomButton full color={'primary'} title={'Svuota storage'} onClick={clearAllData} />
        </CustomRow>
      </CustomViewBottom>
    </PageContainer>
  );
};

export { LoginScreen };
