import { useStyleSheet } from '@hooks/useStyleSheet';
import { Spacing } from '@styles/index';
import { getNumberValue } from '@utils/commonFunctions';
import React, { useState } from 'react';
import { ImageStyle, LayoutRectangle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

const useStyles = ({
  center,
  centerVertical,
  centerHorizontal,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  paddingHorizontal,
  paddingVertical,
  borderRadius = 0,
  backgroundColor,
}: Props) => {
  return StyleSheet.create({
    default: {
      ...mStyles.base,
      justifyContent: center || centerVertical ? 'center' : undefined,
      alignItems: center || centerHorizontal ? 'center' : undefined,
      marginTop:
        marginTop || marginVertical
          ? getNumberValue(marginTop) ?? getNumberValue(marginVertical) ?? Spacing.SCALE_14
          : 0,
      marginBottom:
        marginBottom || marginVertical
          ? getNumberValue(marginBottom) ?? getNumberValue(marginVertical) ?? Spacing.SCALE_14
          : 0,
      marginLeft:
        marginLeft || marginHorizontal
          ? getNumberValue(marginLeft) ?? getNumberValue(marginHorizontal) ?? Spacing.SCALE_14
          : 0,
      marginRight:
        marginRight || marginHorizontal
          ? getNumberValue(marginRight) ?? getNumberValue(marginHorizontal) ?? Spacing.SCALE_14
          : 0,
      paddingHorizontal: paddingHorizontal ? getNumberValue(paddingHorizontal) ?? Spacing.SCALE_14 : 0,
      paddingVertical: paddingVertical ? getNumberValue(paddingVertical) ?? Spacing.SCALE_14 : 0,
      borderRadius,
      backgroundColor,
    },
  });
};

export const CustomView = (props: Props) => {
  const { style, children } = props;
  const styles = useStyleSheet(useStyles(props));
  return <View style={[styles.default, style]}>{children}</View>;
};

export const CustomViewTop = ({ style, children }: Props) => {
  return <View style={[mStyles.top, style]}>{children}</View>;
};
export const CustomViewMiddle = ({ style, children, onLayout, marginTop }: Props) => {
  const [layout, setLayout] = useState<LayoutRectangle>({} as LayoutRectangle);
  const baseStyle = {
    ...mStyles.middle,
    marginTop: marginTop ? Spacing.SCALE_12 : 0,
  };
  return (
    <View
      style={[baseStyle, style]}
      onLayout={(l) => {
        if (!layout.height) {
          setLayout(l.nativeEvent.layout);
          onLayout && onLayout(l.nativeEvent.layout);
        }
      }}>
      {children}
    </View>
  );
};
export const CustomViewBottom = ({ style, children, marginTop }: Props) => {
  const baseStyle = {
    ...mStyles.bottom,
    marginTop: marginTop ? Spacing.SCALE_12 : 0,
  };
  return <View style={[baseStyle, style]}>{children}</View>;
};

const mStyles = StyleSheet.create({
  base: {
    flex: 0,
  },
  top: {
    flex: 0,
    justifyContent: 'flex-start',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 12,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

type Props = {
  style?: ViewStyle | TextStyle | ImageStyle | any[];
  marginTop?: boolean | number;
  marginBottom?: boolean | number;
  marginLeft?: boolean | number;
  marginRight?: boolean | number;
  marginVertical?: boolean | number;
  marginHorizontal?: boolean | number;
  paddingVertical?: boolean | number;
  paddingHorizontal?: boolean | number;
  borderRadius?: number;
  backgroundColor?: string;
  center?: boolean;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  onLayout?: any;
  children?: any;
};
