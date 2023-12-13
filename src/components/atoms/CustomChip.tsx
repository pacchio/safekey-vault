import { CustomText, CustomRow, CustomIcon } from '@components/atoms';
import { Colors, Spacing, Typography } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

const CustomChip = ({ bold, text, style, onClick, onClose, color, disabled }: Props) => {
  const { colors, isDark } = useTheme();
  let tintColor =
    color === 'primary'
      ? Colors.PRIMARY
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'white'
      ? Colors.WHITE
      : Colors.GRAY_LIGHT;

  tintColor =
    isDark && [Colors.WHITE, Colors.WHITE_SMOKED, Colors.GRAY_LIGHT, '', undefined].includes(tintColor || '')
      ? colors.background
      : tintColor;

  const fontFamily = bold ? Typography.FONT_FAMILY_BOLD_APP : Typography.FONT_FAMILY_APP;

  const iconColor = disabled ? Colors.GRAY_DARK : Colors.PRIMARY;
  const textColor = colors.text;
  const textStyle = { ...mStyles.baseTextStyle, color: textColor, fontFamily };
  const chipStyle = {
    ...mStyles.baseStyle,
    backgroundColor: tintColor,
    borderColor: tintColor,
    borderWidth: 1,
  };

  return (
    <View style={[chipStyle, style]}>
      <CustomRow center style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        {text && <CustomText style={[mStyles.baseTextStyle, textStyle] as any}>{text}</CustomText>}
        {onClose && (
          <TouchableOpacity onPress={onClose} style={mStyles.iconContainer} disabled={disabled}>
            <CustomIcon icon={'close'} size={16} color={iconColor} onClick={onClose} />
          </TouchableOpacity>
        )}
      </CustomRow>
    </View>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.SCALE_8,
    paddingVertical: Spacing.SCALE_6,
    borderRadius: 20,
  },
  lightStyle: {
    backgroundColor: Colors.WHITE,
  },
  fullStyle: {
    width: '100%',
  },
  baseTextStyle: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_APP,
    marginLeft: Spacing.SCALE_8,
    maxWidth: '90%',
  },
  iconContainer: {
    alignItems: 'flex-end',
    paddingLeft: Spacing.SCALE_12,
  },
});

type Props = {
  text: string;
  onClick?: any;
  onClose?: any;
  bold?: boolean;
  style?: ViewStyle | TextStyle | ImageStyle;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  disabled?: boolean;
};

export { CustomChip };
