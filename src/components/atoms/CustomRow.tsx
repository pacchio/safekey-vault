import { useStyleSheet } from '@hooks/useStyleSheet';
import { Spacing } from '@styles/index';
import { getNumberValue } from '@utils/commonFunctions';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

const useStyles = ({
  center,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
  nowrap,
  shrink,
}: Props) => {
  return StyleSheet.create({
    default: {
      ...mStyles.baseStyle,
      justifyContent: center ? 'center' : 'flex-start',
      marginTop:
        marginTop || marginVertical
          ? getNumberValue(marginTop) ?? getNumberValue(marginVertical) ?? Spacing.SCALE_8
          : 0,
      marginBottom:
        marginBottom || marginVertical
          ? getNumberValue(marginBottom) ?? getNumberValue(marginVertical) ?? Spacing.SCALE_8
          : 0,
      marginLeft:
        marginLeft || marginHorizontal
          ? getNumberValue(marginLeft) ?? getNumberValue(marginHorizontal) ?? Spacing.SCALE_8
          : 0,
      marginRight:
        marginRight || marginHorizontal
          ? getNumberValue(marginRight) ?? getNumberValue(marginHorizontal) ?? Spacing.SCALE_8
          : 0,
      paddingHorizontal: paddingHorizontal ? getNumberValue(paddingHorizontal) ?? Spacing.SCALE_8 : 0,
      paddingVertical: paddingVertical ? getNumberValue(paddingVertical) ?? Spacing.SCALE_8 : 0,
      flexWrap: nowrap ? 'nowrap' : 'wrap',
      flexShrink: shrink ? 1 : 0,
    },
  });
};

const CustomRow = (props: Props) => {
  const { style, children } = props;
  const styles = useStyleSheet(useStyles(props));
  return <View style={[styles.default, style]}>{children}</View>;
};

const mStyles = StyleSheet.create({
  baseStyle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

type Props = {
  style?: ViewStyle | TextStyle | ImageStyle | any[];
  center?: boolean;
  marginTop?: boolean | number;
  marginBottom?: boolean | number;
  marginLeft?: boolean | number;
  marginRight?: boolean | number;
  marginVertical?: boolean | number;
  marginHorizontal?: boolean | number;
  paddingVertical?: boolean | number;
  paddingHorizontal?: boolean | number;
  nowrap?: boolean;
  shrink?: boolean;
  children: any;
};

export { CustomRow };
