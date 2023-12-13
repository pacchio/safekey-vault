import { CustomRow } from '@components/atoms';
import CheckBox from '@react-native-community/checkbox';
import { Colors, Spacing } from '@styles/index';
import React from 'react';
import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

const CustomCheckBox = ({
  containerStyle,
  style,
  disabled,
  checked,
  onPress,
  center,
  children,
  itemDivider = false,
  canClickOnLabel = true,
  boxType,
}: Props) => {
  let checkboxStyle = !itemDivider ? { ...mStyles.baseStyle, borderBottomWidth: 0 } : { ...mStyles.baseStyle };

  checkboxStyle = center ? { ...checkboxStyle, flex: 0 } : { ...checkboxStyle };

  const checkBoxContentStyle = center ? { ...mStyles.checkBoxContent, flex: 0 } : { ...mStyles.checkBoxContent };

  const CheckboxComponent = () => (
    <CheckBox
      boxType={boxType}
      style={mStyles.checkBox}
      disabled={disabled}
      onValueChange={onPress}
      value={checked}
      animationDuration={0.3}
      tintColors={{
        true: disabled ? Colors.GRAY_DARK : Colors.PRIMARY,
        false: disabled ? Colors.GRAY_DARK : Colors.PRIMARY,
      }}
      tintColor={disabled ? Colors.GRAY_DARK : Colors.PRIMARY}
      onCheckColor={Colors.WHITE}
      onFillColor={disabled ? Colors.GRAY_DARK : Colors.PRIMARY}
      onTintColor={disabled ? Colors.GRAY_DARK : Colors.PRIMARY}
    />
  );

  if (!children) {
    return <CheckboxComponent />;
  }

  return (
    <>
      <CustomRow style={containerStyle}>
        <TouchableOpacity style={[checkboxStyle, style]} onPress={onPress} disabled={!canClickOnLabel || disabled}>
          <CustomRow>
            <TouchableWithoutFeedback style={mStyles.checkBoxContainer}>
              <CheckboxComponent />
            </TouchableWithoutFeedback>
            <View style={checkBoxContentStyle}>{children}</View>
          </CustomRow>
        </TouchableOpacity>
      </CustomRow>
      {itemDivider && <View style={mStyles.divider} />}
    </>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {
    paddingVertical: Spacing.SCALE_12,
    flex: 1,
    flexDirection: 'row',
  },
  checkBoxContainer: {
    height: 22,
    width: 22,
  },
  checkBox: {
    height: 20,
    width: 20,
    marginLeft: Platform.OS === 'android' ? -6 : Spacing.SCALE_4,
  },
  checkBoxContent: {
    flex: 1,
    marginLeft: Platform.OS === 'android' ? Spacing.SCALE_12 : Spacing.SCALE_8,
  },
  divider: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: Colors.GRAY_LIGHT,
  },
});

type Props = {
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  style?: ViewStyle | TextStyle | ImageStyle;
  disabled?: boolean;
  checked?: boolean;
  onPress?: any;
  children?: any;
  center?: boolean;
  itemDivider?: boolean;
  canClickOnLabel?: boolean;
  boxType?: 'circle' | 'square';
};

export { CustomCheckBox };
