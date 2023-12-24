import { CustomInput, CustomLabelText } from '@components/atoms';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppMessageType, showToastMessage } from '@services/ToastService';
import React, { useEffect, useState } from 'react';
import { Account } from 'types/account';
import { v4 } from 'uuid';

const AccountForm = React.forwardRef(({ account }: Props, ref) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (account) {
      setTitle(account.title);
      setUsername(account.username);
      setEmail(account.email);
      setPassword(account.password);
      setNotes(account.notes);
    }
  }, [account]);

  React.useImperativeHandle(ref, () => ({
    getAccountFromForm,
  }));

  const getAccountFromForm = (): Account | undefined => {
    if (!title.trim()) {
      showToastMessage(AppMessageType.ERROR, 'Titolo mancante');
      return;
    }
    if (!username.trim() && !email.trim()) {
      showToastMessage(AppMessageType.ERROR, 'Username o email obbligatori');
      return;
    }
    if (!password) {
      showToastMessage(AppMessageType.ERROR, 'Password mancante');
      return;
    }
    try {
      return {
        id: account?.id ?? v4(),
        title: title.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        notes: notes.trim(),
      };
    } catch (e) {
      return;
    }
  };

  const show = () => {
    setShowPassword(!showPassword);
  };

  const copy = (textToCopy: string) => {
    Clipboard.setString(textToCopy);
    showToastMessage(AppMessageType.INFO, 'Testo copiato');
  };

  return (
    <>
      <CustomLabelText
        labelOnTop
        label={'Titolo'}
        element={<CustomInput value={title} onChangeText={(txt) => setTitle(txt)} placeholder={'Titolo'} />}
      />
      <CustomLabelText
        marginTop
        labelOnTop
        label={'Username'}
        element={
          <CustomInput
            autoCapitalize={'none'}
            value={username}
            onChangeText={(txt) => setUsername(txt)}
            placeholder={'Username'}
            rightIcon={username ? 'content-copy' : undefined}
            rightIconColor={'primary'}
            rightIconOnPress={() => copy(username)}
          />
        }
      />
      <CustomLabelText
        marginTop
        labelOnTop
        label={'Email'}
        element={
          <CustomInput
            type={'email-address'}
            autoCapitalize={'none'}
            value={email}
            onChangeText={(txt) => setEmail(txt)}
            placeholder={'Email'}
            rightIcon={email ? 'content-copy' : undefined}
            rightIconColor={'primary'}
            rightIconOnPress={() => copy(email)}
          />
        }
      />
      <CustomLabelText
        marginTop
        labelOnTop
        label={'Password'}
        element={
          <CustomInput
            isPassword={!showPassword}
            autoCapitalize={'none'}
            value={password}
            onChangeText={(txt) => setPassword(txt)}
            placeholder={'Password'}
            rightIcon={password ? [showPassword ? 'visibility-off' : 'visibility', 'content-copy'] : undefined}
            rightIconColor={'primary'}
            rightIconOnPress={[show, () => copy(password)] as any}
          />
        }
      />
      <CustomLabelText
        marginTop
        labelOnTop
        label={'Note'}
        element={
          <CustomInput numberOfLines={5} value={notes} onChangeText={(txt) => setNotes(txt)} placeholder={'Note'} />
        }
      />
    </>
  );
});

type Props = {
  account?: Account;
};

export { AccountForm };
