import { Alert } from 'react-native';

export const showAlert = (
  title: string,
  message: string,
  onConfirm: (value?: string) => void,
  confirmText?: string,
  onCancel?: () => void,
) => {
  Alert.alert(title, message, [
    { text: 'Annulla', style: 'cancel', onPress: onCancel ?? (() => {}) },
    {
      text: confirmText ?? 'OK',
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
};
