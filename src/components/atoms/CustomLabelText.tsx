import { CustomText, CustomRow, CustomIcon } from '@components/atoms';
import { CustomHelp } from '@components/molecules';
import { Colors, Spacing } from '@styles/index';
import { ICON_SIZE_SMALL } from '@styles/spacing';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

const CustomLabelText = ({
  icon,
  iconFontawesome,
  iconColor = Colors.BLACK_SMOKED,
  label,
  labelOnTop = false,
  labelColor,
  labelBold = false,
  text,
  center,
  textAlignRight,
  element,
  boldText,
  underlineText,
  sizeText,
  textColor,
  marginTop,
  marginBottom,
  marginVertical,
  noWrap,
  help,
  rightButtons,
  style,
  numberOfLines,
  disabled,
}: Props) => {
  return (
    <>
      {labelOnTop ? (
        <View style={[style]}>
          <CustomRow center={center} marginTop={marginTop}>
            <CustomRow style={{ flex: rightButtons ? 1 : 0 }}>
              <CustomText
                color={labelColor || 'primary'}
                bold={labelBold}
                right={textAlignRight}
                style={{
                  marginBottom: Spacing.SCALE_6,
                  flex: textAlignRight ? 1 : 0,
                }}>
                {label}
              </CustomText>
              {help && <CustomHelp help={help} />}
            </CustomRow>
            {rightButtons && <View style={{ justifyContent: 'flex-end' }}>{rightButtons}</View>}
          </CustomRow>
          {!text && (
            <CustomRow center={center} marginBottom={!!marginBottom}>
              {element}
            </CustomRow>
          )}
          {!!text && !element && (
            <CustomRow marginBottom={!!marginBottom} center={center}>
              <CustomText
                selectable={!disabled}
                bold={boldText}
                underline={underlineText}
                color={textColor}
                size={sizeText}
                numberOfLines={numberOfLines}>
                {text}
              </CustomText>
            </CustomRow>
          )}
        </View>
      ) : (
        <CustomRow
          style={[style]}
          nowrap={noWrap}
          center={center}
          marginTop={!!marginTop || !!marginVertical}
          marginBottom={!!marginBottom || !!marginVertical}>
          {(icon || iconFontawesome) && (
            <CustomIcon icon={icon} iconFontawesome={iconFontawesome} color={iconColor} size={ICON_SIZE_SMALL} />
          )}
          {!!label && (
            <CustomText bold={labelBold} color={labelColor}>
              {label}:
            </CustomText>
          )}
          {element &&
            (textAlignRight ? (
              <View style={[mStyles.element, mStyles.textRight]}>{element}</View>
            ) : (
              <View style={mStyles.element}>{element}</View>
            ))}
          {!!text &&
            (textAlignRight ? (
              <View style={mStyles.textRight}>
                <CustomText
                  selectable={!disabled}
                  bold={boldText}
                  underline={underlineText}
                  color={textColor}
                  size={sizeText}
                  numberOfLines={numberOfLines}
                  style={mStyles.text}>
                  {text}
                </CustomText>
              </View>
            ) : (
              <CustomText
                selectable={!disabled}
                bold={boldText}
                underline={underlineText}
                color={textColor}
                size={sizeText}
                style={mStyles.text}>
                {text}
              </CustomText>
            ))}
        </CustomRow>
      )}
    </>
  );
};

const mStyles = StyleSheet.create({
  text: {
    marginLeft: Spacing.SCALE_8,
  },
  element: {
    marginLeft: Spacing.SCALE_8,
    flexDirection: 'column',
  },
  textRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

type Props = {
  icon?: string;
  iconFontawesome?: string;
  iconColor?: 'primary' | 'secondary' | 'accent' | 'white' | 'black' | string;
  label?: string;
  labelOnTop?: boolean;
  labelColor?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  labelBold?: boolean;
  text?: string | number | Date | undefined | Array<any>;
  center?: boolean;
  textColor?: 'primary' | 'secondary' | 'accent' | 'white' | 'black' | string;
  element?: React.ReactNode;
  underlineText?: boolean;
  textAlignRight?: boolean;
  boldText?: boolean;
  sizeText?: number;
  noWrap?: boolean;
  marginTop?: boolean;
  marginBottom?: boolean;
  marginVertical?: boolean;
  help?: { title: string; text: string };
  style?: ViewStyle | TextStyle;
  rightButtons?: React.ReactNode;
  numberOfLines?: number;
  disabled?: boolean;
};

export { CustomLabelText };
