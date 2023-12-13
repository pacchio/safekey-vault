import { CustomButton, CustomIcon, CustomText } from '@components/atoms';
import { CustomBackButton } from '@components/molecules';
import { Spacing } from '@styles/index';
import { commonStyles } from '@utils/commonStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CustomHeader = ({
  title,
  backButton = true,
  toggleDrawer,
  navigation,
  confirm,
  confirmIcon,
  confirmDisabled = false,
}: Props) => {
  const optionButtonPressed = () => {
    navigation.toggleDrawer();
  };

  return (
    <>
      <View style={styles.headerLeft}>{backButton && <CustomBackButton />}</View>
      <View style={styles.headerTitleContainer}>
        <CustomText numberOfLines={1} style={commonStyles.headerTitle}>
          {title}
        </CustomText>
      </View>
      <View style={styles.headerRight}>
        {confirm ? (
          <CustomButton
            padding={'xs'}
            iconSize={Spacing.ICON_SIZE_MEDIUM}
            light
            color={'primary'}
            icon={confirmIcon ?? 'check'}
            onClick={confirm}
            disabled={confirmDisabled}
          />
        ) : toggleDrawer && navigation ? (
          <View style={{ marginRight: Spacing.SCALE_10 }}>
            <CustomIcon icon={'menu'} onClick={optionButtonPressed} />
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

type Props = {
  title: string;
  backButton?: boolean;
  toggleDrawer?: boolean;
  navigation?: any;
  confirm?: any;
  confirmIcon?: any;
  confirmDisabled?: boolean;
};

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { CustomHeader };
