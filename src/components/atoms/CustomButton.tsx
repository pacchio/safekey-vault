import { CustomRow, CustomIcon } from '@components/atoms';
import { Colors, Spacing, Typography } from '@styles/index';
import { ICON_SIZE_MEDIUM } from '@styles/spacing';
import { useTheme } from "@utils/themeProvider";
import React, { useState } from 'react';
import { Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import { wait } from '@utils/commonFunctions';

const CustomButton = ({
  children,
  full,
  light,
  trasparent,
  bold,
  title,
  containerStyle,
  style,
  onClick,
  disabled,
  bordered,
  color,
  padding = 'medium',
  iconSize,
  icon,
  img,
}: Props) => {
  const [canPropagate, setCanPropagate] = useState(true);
  const { colors } = useTheme();

  let buttonColor =
    color === 'primary'
      ? colors.primary
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'white'
      ? Colors.WHITE
      : color === 'black'
      ? Colors.BLACK_SMOKED
      : color;

  buttonColor = disabled ? Colors.GRAY_DARK : buttonColor;

  const fontFamily = bold ? Typography.FONT_FAMILY_BOLD_APP : Typography.FONT_FAMILY_APP;

  let buttonStyle = full
    ? { ...mStyles.baseStyle, ...mStyles.fullStyle, backgroundColor: buttonColor }
    : { ...mStyles.baseStyle, backgroundColor: buttonColor };
  buttonStyle = light ? { ...buttonStyle, ...mStyles.lightStyle } : buttonStyle;
  buttonStyle = trasparent ? { ...buttonStyle, ...mStyles.trasparentStyle } : buttonStyle;
  buttonStyle =
    padding === 'large'
      ? {
          ...buttonStyle,
          paddingHorizontal: Spacing.SCALE_18,
          paddingVertical: Spacing.SCALE_18,
        }
      : padding === 'small'
      ? {
          ...buttonStyle,
          paddingHorizontal: Spacing.SCALE_10,
          paddingVertical: Spacing.SCALE_10,
          borderRadius: 6,
        }
      : padding === 'xs'
      ? {
          ...buttonStyle,
          paddingHorizontal: Spacing.SCALE_6,
          paddingVertical: Spacing.SCALE_6,
          borderRadius: 6,
        }
      : {
          ...buttonStyle,
          paddingHorizontal: icon && !title ? Spacing.SCALE_10 : Spacing.SCALE_14,
          paddingVertical: icon && !title ? Spacing.SCALE_10 : Spacing.SCALE_14,
        };

  let textStyle =
    light || trasparent
      ? { ...mStyles.baseTextStyle, color: buttonColor, fontFamily }
      : { ...mStyles.baseTextStyle, color: colors.buttonText, fontFamily };
  textStyle = icon ? { ...textStyle, marginLeft: Spacing.SCALE_8 } : { ...textStyle };
  textStyle =
    padding === 'large'
      ? {
          ...textStyle,
          fontSize: Typography.FONT_SIZE_BIG,
        }
      : padding === 'small' || padding === 'xs'
      ? {
          ...textStyle,
          fontSize: Typography.FONT_SIZE_SMALL,
        }
      : { ...textStyle };

  let viewContainerStyle: any = icon && !title ? {} : { flex: full ? 1 : 0, borderRadius: 30, overflow: 'hidden' };

  viewContainerStyle = bordered
    ? { ...viewContainerStyle, borderWidth: 1, borderColor: buttonColor }
    : { ...viewContainerStyle };

  const customOnClick = async () => {
    if (canPropagate) {
      onClick();
      setCanPropagate(false);
    }
    await wait(300);
    setCanPropagate(true);
  };

  return (
    <View style={[viewContainerStyle, containerStyle]}>
      <TouchableNativeFeedback
        useForeground={!!(icon && !title)}
        onPress={customOnClick}
        disabled={disabled || false}
        background={
          icon && !title
            ? TouchableNativeFeedback.Ripple(Colors.GRAY_MEDIUM, true)
            : TouchableNativeFeedback.SelectableBackground()
        }>
        <View style={[buttonStyle, style]}>
          {(title || icon || img) && (
            <CustomRow center>
              {icon && (
                <CustomIcon
                  // onClick={!disabled ? onClick : null}
                  icon={icon}
                  size={iconSize}
                  color={disabled ? Colors.GRAY_MEDIUM : textStyle.color}
                />
              )}
              {img && !title && (
                <Image source={img} style={[mStyles.img, { ...(iconSize && { width: iconSize, height: iconSize }) }]} />
              )}
              {img && title && (
                <View style={{ position: 'absolute', left: 0 }}>
                  <Image
                    source={img}
                    style={[mStyles.img, { ...(iconSize && { width: iconSize, height: iconSize }) }]}
                  />
                </View>
              )}
              {title && <Text style={textStyle}>{title}</Text>}
            </CustomRow>
          )}
          {!title && !img && !icon && children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.SCALE_14,
    paddingVertical: Spacing.SCALE_14,
    borderRadius: 30,
  },
  lightStyle: {
    backgroundColor: Colors.WHITE,
  },
  trasparentStyle: {
    backgroundColor: Colors.TRASPARENT,
  },
  fullStyle: {
    width: '100%',
  },
  baseTextStyle: {
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_APP,
    marginLeft: 0,
  },
  iconContainer: {},
  img: {
    height: ICON_SIZE_MEDIUM,
    width: ICON_SIZE_MEDIUM,
    resizeMode: 'contain',
  },
});

type Props = {
  children?: any;
  onClick?: any;
  full?: boolean;
  light?: boolean;
  bordered?: boolean;
  trasparent?: boolean;
  bold?: boolean;
  title?: string;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  style?: ViewStyle | TextStyle | ImageStyle;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black' | string;
  padding?: 'xs' | 'small' | 'medium' | 'large';
  iconSize?: number;
  icon?: string;
  img?: any;
};

export { CustomButton };
