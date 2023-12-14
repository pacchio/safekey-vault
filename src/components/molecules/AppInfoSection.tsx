import { CustomRow, CustomText } from '@components/atoms';
import React from 'react';
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const AppInfoSection = ({}: Props) => {
  return (
    <>
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
