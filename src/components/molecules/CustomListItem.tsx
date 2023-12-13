import { CustomRow, CustomIcon } from '@components/atoms';
import { Colors, Spacing } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

const CustomListItem = ({
  children,
  style,
  arrowStyle,
  onPress,
  onLongPress,
  arrow = false,
  noPaddingVertical = false,
  noBorder = false,
  disabled = false,
}: Props) => {
  const { colors, isDark } = useTheme();
  let baseStyle = styles.item;
  baseStyle = noBorder ? { ...baseStyle, ...styles.itemNoBorder } : baseStyle;
  baseStyle = noPaddingVertical ? { ...baseStyle, ...styles.itemNoPadding } : baseStyle;
  style = style
    ? {
        ...style,
        backgroundColor: isDark ? colors.backgroundPage : !Array.isArray(style) ? style.backgroundColor : Colors.WHITE,
        borderBottomColor: isDark ? colors.background : undefined,
      }
    : undefined;
  return (
    <>
      <TouchableOpacity style={[baseStyle, style]} disabled={disabled} onPress={onPress} onLongPress={onLongPress}>
        <CustomRow style={{ flex: 6 }}>{children}</CustomRow>
        {arrow && (
          <View style={[styles.arrow, arrowStyle]}>
            <CustomIcon icon={'keyboard-arrow-right'} />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

type Props = {
  children?: any;
  style?: ViewStyle | ImageStyle | TextStyle | any[];
  arrowStyle?: ViewStyle | ImageStyle | TextStyle;
  onPress?: any;
  onLongPress?: any;
  arrow?: boolean;
  noPaddingVertical?: boolean;
  noBorder?: boolean;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingTop: Spacing.SCALE_16,
    paddingBottom: Spacing.SCALE_16,
    borderColor: Colors.GRAY_LIGHT,
    borderBottomWidth: 0.5,
  },
  itemNoBorder: {
    borderBottomWidth: 0,
  },
  itemNoPadding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  arrow: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export { CustomListItem };
