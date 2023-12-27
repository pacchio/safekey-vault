import { AppMessageType, showToastMessage } from '@services/ToastService';
import * as _ from 'lodash';
import { Linking, Platform } from 'react-native';
import RNSimpleCrypto from 'react-native-simple-crypto';

const phoneNumberMatcher = /^(([+]|00)39)?((3[1-9][0-9]))(\d{6,7})$/;
const telephoneNumberMatcher = /^(([+]|00)39)?((([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2})))s*[0-9]{3,4}[-]*[0-9]{4}$)/;

const emailValidMatcher =
  /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isPhoneNumberValid = (phoneNumber: string): boolean => {
  if (phoneNumber.match(phoneNumberMatcher) || phoneNumber.match(telephoneNumberMatcher)) {
    return true;
  }
  return false;
};

export const patchPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.startsWith('+39') ? phoneNumber.trim() : '+39' + phoneNumber.trim();
};

export const isEmailValid = (email: string): boolean => {
  return !!email.match(emailValidMatcher);
};

export const isValidUrl = (s: string) => {
  return s && s.trim() && (s.trim().startsWith('http') || s.trim().startsWith('https'));
};

export const openURL = (url: string, onFail?: () => void) => {
  Linking.openURL(url).catch((err) => {
    console.log(err);
    if (onFail) {
      onFail();
    } else {
      showToastMessage(AppMessageType.WARNING, "Impossibile aprire l'url");
    }
  });
};

export const calculateFee = (amount: number, fixedFee: number, percentageFee: number) => {
  if (amount) {
    return parseFloat(parseFloat((fixedFee + (amount * percentageFee) / 100).toFixed(1)).toFixed(2));
  }
  return 0;
};

export const roundNumberToDecimal = (num: number, toFixed = 2) => {
  return parseFloat(num.toFixed(toFixed));
};

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const goToMaps = (lat: number, lng: number) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${lat},${lng}`;
  const label = 'Destinazione';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  if (url) {
    Linking.openURL(url);
  }
};

export const goToMapsDirection = (lat: number, lng: number) => {
  const latLng = `${lat},${lng}`;
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${latLng}`,
    android: `https://www.google.com/maps/dir/?api=1&destination=${latLng}`,
  });
  if (url) {
    Linking.openURL(url);
  }
};

export const toBase64 = (value: string) => {
  return RNSimpleCrypto.utils.convertArrayBufferToBase64(RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(value));
};

export const getNumberValue = (value: boolean | number | undefined): number | undefined => {
  return _.isNumber(value) ? value : undefined;
};

export const strToJson = (str: string): Object | undefined => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return;
  }
};
