import { CustomButton } from '@components/atoms';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

const CopyToClipboardButton = ({ textToCopy, message, style }: Props) => {
  const copy = () => {
    Clipboard.setString(textToCopy);
    showToastMessage(AppMessageType.INFO, message);
  };
  return (
    <>
      <CustomButton style={style} light trasparent icon={'content-copy'} color={'primary'} onClick={copy} />
    </>
  );
};

type Props = {
  style?: ViewStyle | TextStyle;
  message: string;
  textToCopy: string;
};

export { CopyToClipboardButton };
