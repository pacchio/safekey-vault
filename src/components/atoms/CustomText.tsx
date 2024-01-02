import { Colors, Typography } from '@styles/index';
import { FONT_SIZE_MEDIUM } from '@styles/typography';
import { useTheme } from '@utils/themeProvider';
import * as _ from 'lodash';
import React from 'react';
import { ImageStyle, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

const CustomText = ({
  onClick,
  color = 'black',
  underline,
  lineThrough,
  bold,
  size,
  style,
  center,
  right,
  uppercase,
  selectable,
  numberOfLines,
  children,
}: Props) => {
  const { colors, isDark } = useTheme();

  let textColor =
    color === 'primary'
      ? colors.primary
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'gray'
      ? Colors.GRAY_DARK
      : color === 'white'
      ? Colors.WHITE
      : color === 'black'
      ? Colors.BLACK_SMOKED
      : color;

  textColor =
    isDark && [Colors.BLACK_SMOKED, Colors.BLACK, '', undefined].includes(textColor || '') ? colors.text : textColor;

  const fontSize = size ? size : FONT_SIZE_MEDIUM;

  const fontFamily = bold ? Typography.FONT_FAMILY_BOLD_APP : Typography.FONT_FAMILY_APP;

  const textDecorationLine = underline ? 'underline' : lineThrough ? 'line-through' : 'none';
  const textAlign = center ? 'center' : right ? 'right' : 'left';
  const textTransform = uppercase ? 'uppercase' : 'none';
  const fontWeight = bold ? 'bold' : 'normal';

  const textStyle = {
    ...mStyles.baseStyle,
    color: textColor,
    fontSize,
    textAlign,
    fontFamily,
    textDecorationLine,
    textTransform,
    fontWeight,
  };

  const renderTextOrPrice = () => {
    if (
      children instanceof Array &&
      children.length > 0 &&
      children.findIndex((c) => typeof c === 'string' && c.trim() === '€') > -1
    ) {
      const i = children.findIndex((c) => _.isNumber(c));
      const newChildren = [...children];
      if (i > -1) {
        newChildren[i] = newChildren[i].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }
      return newChildren;
    }
    return children;
  };

  return (
    <Text
      style={[textStyle, style] as any}
      numberOfLines={numberOfLines || 0}
      onPress={onClick}
      selectable={!!selectable}>
      {renderTextOrPrice()}
    </Text>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {},
});

type Props = {
  onClick?: any;
  color?: 'primary' | 'secondary' | 'accent' | 'gray' | 'white' | 'black' | string;
  underline?: boolean;
  lineThrough?: boolean;
  bold?: boolean;
  size?: number;
  center?: boolean;
  right?: boolean;
  selectable?: boolean;
  uppercase?: boolean;
  numberOfLines?: number;
  style?: ViewStyle | TextStyle | ImageStyle | any[];
  children?: any;
};

export { CustomText };
