import {
  CustomButton,
  CustomIcon,
  CustomInput,
  CustomRow,
  CustomSortListView,
  CustomText,
  CustomView,
} from '@components/atoms';
import { CustomHeader, CustomListItem } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { showAlert } from '@services/AlertService';
import { Colors } from '@styles/index';
import { commonStyles } from '@utils/commonStyles';
import { useTheme } from '@utils/themeProvider';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Account } from 'types/account';
import { ROUTE_NAMES } from '../routes';

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    zIndex: Platform.OS === 'ios' ? 1 : undefined,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

const AccountsListScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const { accounts, setAccounts } = useAccounts();
  const [accountsList, setAccountsList] = useState<Account[]>([]);
  const [term, setTerm] = useState('');
  const { colors } = useTheme();

  useEffect(() => {
    setAccountsList(accounts);
  }, [accounts]);

  const openSettings = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const onChangeText = (text: string) => {
    setTerm(text);
    searchUpdate(text);
  };

  const onCancelText = () => {
    onChangeText('');
    Keyboard.dismiss();
  };

  const searchUpdate = (text: string) => {
    if (text.length === 0 || text.length > 1) {
      setAccountsList(accounts.filter((a) => a.title.toLowerCase().includes(text.toLowerCase())));
    }
  };

  const onDragEnd = ({ data }: any) => {
    setAccounts(data);
    setAccountsList(data);
  };

  const goToDetail = (id: string) => {
    navigate(ROUTE_NAMES.ACCOUNT_DETAIL, { id });
  };

  const goToAddItemPage = () => {
    navigate(ROUTE_NAMES.ADD_ACCOUNT);
  };

  const deleteAccount = (id: string) => {
    const index = accounts.findIndex((a) => a.id === id);
    if (index > -1) {
      const _accounts = _.cloneDeep(accounts);
      _accounts.splice(index, 1);
      setAccounts(_accounts);
      setAccountsList(_accounts);
    }
  };

  const onDeleteAccount = (close: any, account: any) => {
    close();
    showAlert('Attenzione', 'Sei sicuro di voler eliminare questa opzione?', () => deleteAccount(account.id));
  };

  const AddItemButton = () => {
    return (
      <View style={styles.addButton}>
        <CustomButton icon={'add'} padding={'large'} color={'primary'} onClick={goToAddItemPage} />
      </View>
    );
  };

  const renderItem = (data: { item: Account; index: any; drag: any; isActive: any }) => {
    return (
      <CustomListItem
        onLongPress={data.drag}
        onPress={() => goToDetail(data.item.id)}
        arrow
        style={commonStyles.rowContainer}>
        <CustomView centerVertical>
          <CustomIcon icon={'reorder'} color={'gray'} />
        </CustomView>
        <CustomView centerVertical marginLeft style={{ flex: 8 }}>
          <CustomText>{`${data.item.title}`}</CustomText>
        </CustomView>
      </CustomListItem>
    );
  };

  const renderHiddenItem = (data: { item: Account }, close: Promise<void>) => (
    <View style={commonStyles.rowBack}>
      <TouchableOpacity
        style={[commonStyles.backRightBtn, { backgroundColor: colors.primary }]}
        onPress={() => onDeleteAccount(close, data.item)}>
        <CustomIcon icon={'delete'} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );

  return (
    <PageContainer
      noMargin
      useScrollView={false}
      useSafeArea={true}
      customHeader={<CustomHeader title={'Home'} backButton={false} confirmIcon={'settings'} confirm={openSettings} />}
      absoluteElementBottom={<AddItemButton />}>
      <CustomRow>
        <CustomInput
          value={term}
          onChangeText={onChangeText}
          icon={'search'}
          placeholder={'Cerca...'}
          rightIcon={term ? 'close' : ''}
          rightIconOnPress={onCancelText}
        />
      </CustomRow>
      <CustomView style={{ flex: 1 }}>
        {accountsList?.length ? (
          <CustomSortListView
            data={accountsList}
            renderItem={renderItem}
            renderHiddenItemRight={renderHiddenItem}
            numberOfHiddenItem={1}
            onDragEnd={onDragEnd}
          />
        ) : (
          <CustomView marginHorizontal={20} centerHorizontal marginTop>
            <CustomText>Nessun account presente</CustomText>
          </CustomView>
        )}
      </CustomView>
    </PageContainer>
  );
};

export { AccountsListScreen };
