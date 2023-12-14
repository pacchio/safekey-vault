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
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
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

  const searchUpdate = _.debounce((text: string) => {
    if (text.length === 0 || text.length > 2) {
      setAccountsList(accounts.filter((a) => a.title.toLowerCase().includes(text.toLowerCase())));
    }
  }, 200);

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

  const renderSortableItem = (data: { item: Account; index: any; drag: any; isActive: any }, onPress: any) => {
    return (
      <CustomListItem onLongPress={data.drag} onPress={onPress} arrow style={commonStyles.rowContainer}>
        <CustomView centerVertical>
          <CustomIcon icon={'reorder'} color={'gray'} />
        </CustomView>
        <CustomView centerVertical marginLeft style={{ flex: 8 }}>
          <CustomText color={'primary'} bold>{`${data.item.title}`}</CustomText>
        </CustomView>
      </CustomListItem>
    );
  };

  const renderHiddenItem = (data: { item: Account }, close: Promise<void>) => (
    <View style={commonStyles.rowBack}>
      <TouchableOpacity style={[commonStyles.backRightBtn]} onPress={() => onDeleteAccount(close, data.item)}>
        <CustomIcon icon={'delete'} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );

  return (
    <PageContainer
      noMargin
      customHeader={<CustomHeader title={'Home'} backButton={false} confirmIcon={'settings'} confirm={openSettings} />}
      absoluteElementBottom={<AddItemButton />}>
      <CustomRow>
        <CustomInput value={term} onChangeText={onChangeText} icon={'search'} placeholder={'Cerca...'} />
      </CustomRow>
      <CustomView marginTop>
        <CustomSortListView
          data={accountsList}
          renderItem={(data: { item: Account; index: any; drag: any; isActive: any }) =>
            renderSortableItem(data, () => goToDetail(data.item.id))
          }
          renderHiddenItemRight={renderHiddenItem}
          numberOfHiddenItem={1}
          onDragEnd={onDragEnd}
        />
      </CustomView>
    </PageContainer>
  );
};

export { AccountsListScreen };
