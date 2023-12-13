import { CustomText, CustomRow, CustomModal, CustomInput } from '@components/atoms';
import { Colors, Spacing } from '@styles/index';
import React, { useEffect, useState } from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { HsvColor } from 'react-native-color-picker/dist/typeHelpers';

const CustomColorPicker = React.forwardRef(({ value, onColorSelected, placeholder, disabled, style }: Props) => {
  const [show, setShow] = useState(false);
  const [localColor, setLocalColor] = useState<string | HsvColor>();

  useEffect(() => {
    if (value) {
      setLocalColor(value);
    }
  }, [value]);

  const confirm = (color: string) => {
    onColorSelected && onColorSelected(color.toUpperCase());
    setShow(false);
  };

  return (
    <View style={[mStyle.container, style]}>
      <CustomInput
        disabled={true}
        value={value}
        onContainerPress={!disabled ? () => setShow(true) : null}
        placeholder={placeholder}
        rightIcon={'palette'}
      />
      <CustomModal visibile={show} onBackdropPress={() => setShow(false)}>
        <View style={mStyle.baseContentModal}>
          <CustomRow center>
            <CustomText bold>Premi al centro per confermare</CustomText>
          </CustomRow>
          <ColorPicker
            color={localColor}
            onColorChange={(c) => setLocalColor(c)}
            onColorSelected={confirm}
            style={{ flex: 1 }}
          />
        </View>
      </CustomModal>
    </View>
  );
});

const mStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseContentModal: {
    backgroundColor: Colors.WHITE,
    width: '100%',
    height: '70%',
    paddingHorizontal: Spacing.SCALE_12,
    paddingVertical: Spacing.SCALE_20,
  },
});

type Props = {
  onColorSelected?: ((color: string) => void) | undefined;
  value?: string;
  disabled?: boolean;
  style?: ViewStyle | TextStyle | ImageStyle;
  placeholder?: string;
};

export { CustomColorPicker };
