import { Colors } from '@styles/index';
import { ICON_SIZE_MEDIUM } from '@styles/spacing';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const CustomIcon = ({ onClick, icon, size, color, iconFontawesome, style }: Props) => {
  const { colors, isDark } = useTheme();
  let newColor =
    color === 'primary'
      ? Colors.PRIMARY
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'white'
      ? Colors.WHITE
      : color === 'gray'
      ? Colors.GRAY_DARK
      : color;
  newColor =
    isDark && [Colors.BLACK_SMOKED, Colors.BLACK, '', undefined].includes(newColor || '') ? colors.text : newColor;

  const renderIcon = iconFontawesome ? (
    <FontAwesome
      name={iconFontawesome}
      size={(size || ICON_SIZE_MEDIUM) - 1.8}
      style={{ color: newColor || Colors.BLACK_SMOKED }}
    />
  ) : (
    <MaterialIcons
      name={icon || ''}
      size={size || ICON_SIZE_MEDIUM}
      style={{ color: newColor || Colors.BLACK_SMOKED }}
    />
  );

  return (
    <>
      {onClick ? (
        <TouchableNativeFeedback onPress={onClick} style={[mStyles.iconContainer, style]}>
          {renderIcon}
        </TouchableNativeFeedback>
      ) : (
        <View style={[mStyles.iconContainer, style]}>{renderIcon}</View>
      )}
    </>
  );
};

const mStyles = StyleSheet.create({
  iconContainer: {},
});

type Props = {
  onClick?: any;
  icon?: string;
  iconFontawesome?: string;
  size?: number;
  style?: ViewStyle | TextStyle | ImageStyle;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black' | 'gray' | string;
};

export { CustomIcon };
