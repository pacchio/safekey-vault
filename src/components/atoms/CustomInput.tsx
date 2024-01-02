import { CustomIcon } from '@components/atoms';
import { ColorType } from '@styles/colors';
import { Colors, Spacing, Typography } from '@styles/index';
import { ICON_SIZE_SMALL } from '@styles/spacing';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import {
  ImageStyle,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

const CustomInput = React.forwardRef(
  (
    {
      style,
      inputStyle,
      light,
      type,
      placeholder,
      isPassword,
      autoCapitalize,
      onChangeText,
      value,
      disabled,
      closeKeyBoardOnDone = true,
      numberOfLines = 1,
      icon,
      iconFontawesome,
      iconColor,
      rightIcon,
      rightIconOnPress,
      rightIconColor,
      returnKeyType,
      onSubmitEditing,
      onFocus,
      onTouchEnd,
      onContainerPress,
      maxLength,
    }: Props,
    ref: any,
  ) => {
    const { colors, isDark } = useTheme();
    const inputContainerStyle = light
      ? { ...mStyle.container, backgroundColor: Colors.WHITE }
      : { ...mStyle.container, backgroundColor: colors.backgroundInput };

    let mInputStyle =
      icon || iconFontawesome
        ? {
            ...mStyle.input,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }
        : mStyle.input;

    mInputStyle = rightIcon ? { ...mInputStyle, borderBottomRightRadius: 0, borderTopRightRadius: 0 } : mInputStyle;

    mInputStyle = light
      ? {
          ...mInputStyle,
          backgroundColor: Colors.WHITE,
        }
      : {
          ...mInputStyle,
          backgroundColor: colors.backgroundInput,
          color: colors.text,
        };

    const iconContainerStyle = light
      ? { ...mStyle.iconContainer, backgroundColor: Colors.WHITE }
      : { ...mStyle.iconContainer, backgroundColor: colors.backgroundInput };
    const iconContainerRightStyle = light
      ? { ...mStyle.iconContainerRight, backgroundColor: Colors.WHITE }
      : { ...mStyle.iconContainerRight, backgroundColor: colors.backgroundInput };

    const getType = () => {
      if (type === 'numeric' && Platform.OS === 'ios') {
        return 'numbers-and-punctuation';
      }
      return type || 'default';
    };

    const _onChangeText = (v: string) => {
      if (type === 'numeric' || type === 'numbers-and-punctuation' || type === 'number-pad') {
        v = v.replace(/,/g, '.');
      }
      onChangeText && onChangeText(v);
    };

    const _onSubmitEditing = (e: any) => {
      numberOfLines <= 1 && closeKeyBoardOnDone && Keyboard.dismiss();
      onSubmitEditing && onSubmitEditing(e);
    };

    const RightIcon = ({ icon, color, onPress }: { icon: string; color?: ColorType; onPress?: () => void }) => (
      <TouchableOpacity style={iconContainerRightStyle} onPress={onPress}>
        <CustomIcon icon={icon} size={ICON_SIZE_SMALL} color={isDark ? colors.text : color ?? Colors.GRAY_DARK} />
      </TouchableOpacity>
    );

    return (
      <TouchableOpacity style={[inputContainerStyle, style]} onPress={onContainerPress}>
        <View style={[inputContainerStyle]}>
          {(icon || iconFontawesome) && (
            <View style={iconContainerStyle}>
              <CustomIcon
                icon={icon}
                iconFontawesome={iconFontawesome}
                size={ICON_SIZE_SMALL}
                color={iconColor ?? Colors.GRAY_DARK}
              />
            </View>
          )}
          <TextInput
            ref={ref}
            value={value}
            multiline={numberOfLines > 1}
            numberOfLines={numberOfLines}
            // @ts-ignore
            minHeight={Platform.OS === 'ios' && numberOfLines ? 20 * numberOfLines : null}
            autoCorrect={true}
            blurOnSubmit={false}
            autoCompleteType="off"
            autoCapitalize={autoCapitalize || 'sentences'}
            keyboardAppearance="dark"
            keyboardType={getType()}
            spellCheck={false}
            returnKeyType={returnKeyType || 'default'}
            secureTextEntry={isPassword || false}
            style={[mInputStyle, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={Colors.GRAY_DARK}
            underlineColorAndroid="transparent"
            onChangeText={_onChangeText}
            onSubmitEditing={_onSubmitEditing}
            onFocus={onFocus}
            onTouchEnd={onTouchEnd}
            editable={!disabled}
            maxLength={maxLength}
          />
          {(icon || iconFontawesome) && !rightIcon && <View style={iconContainerRightStyle} />}
          {rightIcon &&
            (Array.isArray(rightIcon) ? (
              rightIcon.map((icon, index) => (
                <RightIcon
                  key={index}
                  icon={icon}
                  color={Array.isArray(rightIconColor) ? rightIconColor[index] : rightIconColor}
                  onPress={Array.isArray(rightIconOnPress) ? rightIconOnPress[index] : rightIconOnPress}
                />
              ))
            ) : (
              <RightIcon icon={rightIcon} color={rightIconColor as string} onPress={rightIconOnPress} />
            ))}
        </View>
      </TouchableOpacity>
    );
  },
);

const mStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 0,
  },
  input: {
    color: Colors.BLACK_SMOKED,
    backgroundColor: Colors.GRAY_LIGHT,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_FAMILY_APP,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: Spacing.SCALE_16,
    paddingVertical: Spacing.SCALE_16,
    flex: 1,
  },
  iconContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingLeft: Spacing.SCALE_16,
    paddingVertical: Spacing.SCALE_16,
  },
  iconContainerRight: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: Spacing.SCALE_16,
    paddingRight: Spacing.SCALE_16,
    paddingVertical: Spacing.SCALE_16,
  },
});

type Props = {
  light?: boolean;
  isPassword?: boolean | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string;
  disabled?: boolean;
  closeKeyBoardOnDone?: boolean;
  numberOfLines?: number;
  style?: ViewStyle | TextStyle | ImageStyle;
  inputStyle?: Object;
  placeholder?: string;
  returnKeyType?: 'default' | 'next' | 'go' | 'done';
  onSubmitEditing?: any;
  onFocus?: any;
  onTouchEnd?: any;
  onContainerPress?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  type?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  icon?: string;
  iconFontawesome?: string;
  iconColor?: ColorType;
  rightIcon?: string | string[];
  rightIconOnPress?: () => void | (() => void)[];
  rightIconColor?: ColorType | ColorType[];
  maxLength?: number;
};

export { CustomInput };
