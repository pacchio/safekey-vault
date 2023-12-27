import { CustomRow, CustomText, CustomView, CustomViewBottom } from '@components/atoms';
import { AppInfoSection, CustomListItem } from '@components/molecules';
import CustomMenuItem from '@components/molecules/CustomMenuItem';
import { navigate } from '@navigation/NavigationService';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/src/types';
import { ROUTE_NAMES } from '@routes/home';
import { Colors, Spacing } from '@styles/index';
import { commonStyles } from '@utils/commonStyles';
import { ToggleDarkMode, useTheme } from '@utils/themeProvider';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const HomeDrawerContentComponent = (props: DrawerContentComponentProps) => {
  const { colors, isDark } = useTheme();

  const mContainerStyle = {
    ...styles.container,
    backgroundColor: colors.backgroundPage,
  };

  const importAccounts = () => {
    navigate(ROUTE_NAMES.ACCOUNT_IMPORT_SELECT_METHOD);
  };

  const exportAccounts = () => {
    navigate(ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_METHOD);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={mContainerStyle}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomView center marginVertical={8}>
          <CustomText style={commonStyles.headerTitle}>Impostazioni</CustomText>
        </CustomView>
        <CustomMenuItem icon={'file-download'} title={'Importa'} onPress={importAccounts} />
        <CustomMenuItem icon={'file-upload'} title={'Esporta'} onPress={exportAccounts} />
        <CustomListItem style={commonStyles.menuItem}>
          <CustomRow>
            <ToggleDarkMode style={{ marginLeft: -Spacing.SCALE_12 }} />
            <CustomText style={{ marginLeft: Spacing.SCALE_8 }}>Modalità scura</CustomText>
          </CustomRow>
        </CustomListItem>
        <CustomViewBottom style={styles.bottomView}>
          <AppInfoSection />
        </CustomViewBottom>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  containDrawerOption: {
    marginTop: Spacing.SCALE_12,
    marginLeft: Spacing.SCALE_8,
    alignItems: 'center',
  },
  text: {
    marginLeft: Spacing.SCALE_8,
  },
  bottomView: {
    marginHorizontal: Spacing.MARGIN_FROM_BOARD,
    marginBottom: Spacing.MARGIN_FROM_BOARD,
  },
});

type Props = {
  navigation: any;
};

export { HomeDrawerContentComponent };
