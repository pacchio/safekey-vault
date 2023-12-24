import { CustomIcon, CustomText } from '@components/atoms';
import { Colors, Spacing, Typography } from '@styles/index';
import { ICON_SIZE_BIG, ICON_SIZE_SMALL } from '@styles/spacing';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const toastConfig = {
  custom_success: (internalState: any) => <BaseToast {...internalState} color={Colors.SUCCESS} icon={'check-circle'} />,
  custom_warning: (internalState: any) => <BaseToast {...internalState} color={Colors.WARNING} icon={'warning'} />,
  custom_error: (internalState: any) => <BaseToast {...internalState} color={Colors.ERROR} icon={'cancel'} />,
  custom_info: (internalState: any) => <BaseToast {...internalState} color={Colors.INFO} icon={'info'} />,
};

const BaseToast = (props: any) => {
  const { color, icon, text1, text2, hide } = props;
  const { colors } = useTheme();

  const mBaseStyle = { ...styles.base, backgroundColor: colors.backgroundPage };
  const baseStyle = [mBaseStyle, styles.borderLeft, { borderLeftColor: color }];

  return (
    <View style={baseStyle}>
      <View style={styles.iconContainer}>
        {icon ? <CustomIcon icon={icon} size={ICON_SIZE_BIG} color={color} /> : <></>}
      </View>

      <View style={styles.contentContainer}>
        <View>
          {text1 ? (
            <View>
              <CustomText style={styles.text1}>{text1}</CustomText>
            </View>
          ) : (
            <></>
          )}
          {text2 ? (
            <View>
              <CustomText style={styles.text2} numberOfLines={2}>
                {text2}
              </CustomText>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.closeButtonContainer} onPress={hide}>
        <CustomIcon icon={'close'} size={ICON_SIZE_SMALL} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: 70,
    flex: 1,
    marginHorizontal: Spacing.MARGIN_FROM_BOARD,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  borderLeft: {
    borderLeftWidth: Spacing.SCALE_10,
    borderLeftColor: Colors.SUCCESS,
  },
  iconContainer: {
    paddingHorizontal: Spacing.SCALE_16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    paddingHorizontal: Spacing.SCALE_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: Typography.FONT_SIZE_MEDIUM,
    marginBottom: Spacing.SCALE_4,
    marginTop: Spacing.SCALE_4,
  },
  text2: {
    fontSize: Typography.FONT_SIZE_10,
    color: Colors.GRAY_DARK,
  },
});
