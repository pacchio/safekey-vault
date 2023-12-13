import { CustomRow, CustomText } from '@components/atoms';
import { isProd } from '@utils/config';
import React from 'react';
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const AppInfoSection = ({}: Props) => {
  return (
    <>
      {!isProd() && (
        <CustomRow center>
          <CustomText bold>[ MODALITA' DI TEST ]</CustomText>
        </CustomRow>
      )}
      <CustomRow center marginTop>
        <CustomText>Versione </CustomText>
        <CustomText bold>{DeviceInfo.getVersion()}</CustomText>
      </CustomRow>
      <CustomRow center marginTop>
        <CustomText center>
          Copyright © {new Date().getFullYear()} <CustomText bold>NextApp Studio srls</CustomText>,{'\n'} All Rights
          Reserved.
        </CustomText>
      </CustomRow>
    </>
  );
};

type Props = {};

const mStyles = StyleSheet.create({});

export { AppInfoSection };
