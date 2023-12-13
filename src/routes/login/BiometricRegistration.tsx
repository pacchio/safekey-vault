import { CustomButton, CustomRow, CustomViewBottom } from '@components/atoms';
import { CustomText } from '@components/atoms/CustomText';
import { PageContainer } from '@components/organisms';
import { useBiometrics } from '@hooks/useBiometrics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import { user } from '@store/slices';
import { FONT_SIZE_BIG } from '@styles/typography';
import React from 'react';
import { useDispatch } from 'react-redux';

const BiometricRegistrationScreen = ({}: NativeStackScreenProps<any>) => {
  const dispatch = useDispatch();
  const { biometryType, simplePrompt } = useBiometrics();

  const setupBiometrics = async () => {
    try {
      const { success, error } = await simplePrompt();
      if (error) {
        showToastMessage(AppMessageType.ERROR, error);
      }
      if (success) {
        showToastMessage(AppMessageType.SUCCESS, 'Setup completato con successo!');
      }
    } catch (e: any) {
      showToastMessage(AppMessageType.ERROR, 'Errore generico durante il setup: ' + e.toString());
    } finally {
      proceed();
    }
  };

  const proceed = () => {
    dispatch(user.actions.setInLoggedIn(true));
  };

  return (
    <>
      <PageContainer>
        <CustomRow center>
          <CustomText bold size={FONT_SIZE_BIG}>
            Setup accesso biometrico
          </CustomText>
        </CustomRow>
        <CustomRow center marginTop marginBottom={20}>
          <CustomText>Crea il tuo codice di accesso personale</CustomText>
        </CustomRow>
        <CustomRow marginTop={20}>
          <CustomButton full color={'primary'} title={`Setup ${biometryType}`} onClick={setupBiometrics} />
        </CustomRow>
        <CustomViewBottom>
          <CustomRow>
            <CustomButton full light color={'primary'} title={'Prosegui senza'} onClick={proceed} />
          </CustomRow>
        </CustomViewBottom>
      </PageContainer>
    </>
  );
};

export { BiometricRegistrationScreen };
