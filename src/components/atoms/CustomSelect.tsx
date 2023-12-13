import { CustomIcon } from '@components/atoms';
import { Colors, Spacing, Typography } from '@styles/index';
import React, { useEffect, useState } from 'react';
import { ImageStyle, LogBox, Platform, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

LogBox.ignoreLogs(['Warning: Cannot update a component from inside the function body of a different component.']);

const CustomSelect = React.forwardRef(
  ({ style, inputStyle, iconContainerStyle, placeholder, onValueChange, value, disabled, items }: Props) => {
    const [tempItems, setTempItems] = useState<any>([]);

    useEffect(() => {
      setTimeout(() => {
        setTempItems(items);
      });
    }, [items]);

    return (
      <View style={[mStyle.baseStyle, style]}>
        <RNPickerSelect
          placeholder={placeholder ? { label: placeholder, value: undefined } : {}}
          onValueChange={onValueChange}
          useNativeAndroidPickerStyle={false}
          items={tempItems || []}
          disabled={disabled}
          value={value}
          style={{
            placeholder: disabled ? {} : mStyle.placeholder,
            inputAndroidContainer: mStyle.inputContainer,
            inputIOSContainer: mStyle.inputContainer,
            inputAndroid: { ...mStyle.input, ...inputStyle },
            inputIOS: { ...mStyle.input, ...inputStyle },
            iconContainer: { ...mStyle.iconContainer, ...iconContainerStyle },
          }}
          // @ts-ignore
          Icon={() => <CustomIcon icon={'expand-more'} />}
          pickerProps={{}}
          doneText={'Fatto'}
        />
      </View>
    );
  },
);

const mStyle = StyleSheet.create({
  baseStyle: {
    flex: 1,
  },
  input: {
    color: Colors.BLACK_SMOKED,
    backgroundColor: Colors.GRAY_LIGHT,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_FAMILY_APP,
    borderRadius: 10,
    paddingHorizontal: Spacing.SCALE_16,
    paddingVertical: Platform.OS === 'android' ? Spacing.SCALE_10 : Spacing.SCALE_16,
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },
  inputContainer: {
    borderRadius: 50,
  },
  placeholder: {
    color: Colors.BLACK_SMOKED,
  },
  iconContainer: {
    top: Spacing.SCALE_16,
    right: Spacing.SCALE_8,
  },
});

type Props = {
  items?: Item[];
  onValueChange: (value: any, index: number) => void;
  value?: any;
  disabled?: boolean;
  style?: ViewStyle | TextStyle | ImageStyle;
  inputStyle?: ViewStyle | TextStyle | ImageStyle;
  iconContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  placeholder?: string | null;
};

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
  displayValue?: boolean;
}

export { CustomSelect };
