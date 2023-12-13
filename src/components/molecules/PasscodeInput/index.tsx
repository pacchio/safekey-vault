import { CustomRow } from '@components/atoms';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Keyboard, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View } from 'react-native';
import { usePasscodeInput } from './usePasscodeInput';

const styles = StyleSheet.create({
  control: {
    minWidth: 32,
  },
  input: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 2,
    shadowOpacity: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 28,
    lineHeight: 28,
    height: 44,
    color: 'black',
  },
  wrapper: {
    paddingVertical: 0,
    paddingHorizontal: 0.5 * 16,
  },
});

const Input = forwardRef(({ value, onChange, autofocus }: InputProps, ref) => {
  const inputRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    },
  }));
  return (
    <View style={styles.control}>
      <TextInput
        autoFocus={autofocus}
        value={value}
        onChange={onChange}
        style={styles.input}
        keyboardType={'number-pad'}
        ref={inputRef}
      />
    </View>
  );
});

type InputProps = {
  value: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  autofocus?: boolean;
};

const PasscodeInput = ({ passwordLength, onChange, autofocus }: Props) => {
  const [passcode, passcodeFields, setPasscodeItem, passcodeInputRefs] = usePasscodeInput(passwordLength);

  useEffect(() => {
    if (autofocus) {
      passcodeInputRefs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    onChange && onChange(passcode);
  }, [passcode]);

  return (
    <CustomRow center>
      {passcodeFields.map((field, index) => (
        <View style={styles.wrapper} key={index}>
          <Input
            ref={passcodeInputRefs[index]}
            autofocus={autofocus && index === 0}
            value={field}
            onChange={(e) => {
              const textValue = e.nativeEvent.text.substring(0, passcodeFields.length);
              setPasscodeItem(index, textValue);
              if (e.nativeEvent.text === '') {
                if (index - 1 >= 0) {
                  passcodeInputRefs[index - 1].current.focus();
                }
              } else {
                const str = textValue.substring(0, passcodeInputRefs.length - 1 - index);
                if (index < passcodeInputRefs.length - 1) {
                  passcodeInputRefs[index + str.length].current.focus();
                }
              }
            }}
          />
        </View>
      ))}
    </CustomRow>
  );
};

type Props = {
  passwordLength: number;
  onChange?: (passcode: string) => void;
  autofocus?: boolean;
};

export { PasscodeInput };
