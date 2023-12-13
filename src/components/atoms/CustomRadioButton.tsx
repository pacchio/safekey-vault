import { Colors } from '@styles/index';
import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { RadioButtonProps } from 'react-native-radio-buttons-group/lib/types';

const CustomRadioButton = ({ color = 'primary', textColor = 'white', onValueChange, value, list, style }: Props) => {
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([]);
  const buttonColor =
    color === 'primary'
      ? Colors.PRIMARY
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'black'
      ? Colors.BLACK_SMOKED
      : Colors.WHITE;

  const baseStyle = {
    ...mStyles.baseStyle,
  };

  useEffect(() => {
    setRadioButtons(
      list.map((item) => ({
        id: item.value,
        value: item.value,
        label: item.label,
        selected: value === item.value,
        color: buttonColor,
        labelStyle: { color: textColor },
      })),
    );
  }, [buttonColor, list, textColor, value]);

  const onPress = (buttonId: string) => {
    const itemSelected = radioButtons.find((b) => b.id === buttonId);
    onValueChange &&
      itemSelected?.value &&
      itemSelected?.label &&
      onValueChange(itemSelected.value, itemSelected.label);
  };

  return (
    <View style={[baseStyle, style]}>
      <RadioGroup containerStyle={mStyles.radioStyle} layout={'column'} radioButtons={radioButtons} onPress={onPress} />
    </View>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {
    alignItems: 'flex-start',
  },
  radioStyle: {
    alignItems: 'flex-start',
  },
});

type Props = {
  list: { value: string; label: string }[];
  value?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  textColor?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  style?: ViewStyle | TextStyle | ImageStyle;
  onValueChange: (value: string, label: string) => void;
};

export { CustomRadioButton };
