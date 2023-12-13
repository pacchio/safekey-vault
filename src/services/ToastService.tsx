import Toast from 'react-native-toast-message';

export const showToastMessage = (type: AppMessageType, message: string) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    visibilityTime: type === AppMessageType.INFO || AppMessageType.ERROR ? 6000 : 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 30,
    type: type,
  });
};

export enum AppMessageType {
  INFO = 'custom_info',
  SUCCESS = 'custom_success',
  WARNING = 'custom_warning',
  ERROR = 'custom_error',
}
