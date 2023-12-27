import {
  CustomButton,
  CustomFlatListView,
  CustomRow,
  CustomText,
  CustomView,
  CustomViewBottom,
  CustomViewMiddle,
} from '@components/atoms';
import { CustomHeader, CustomListItem } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { MAX_EXPORTABLE } from '@constants/index';
import { useAccounts } from '@hooks/useAccounts';
import { navigate } from '@navigation/NavigationService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTE_NAMES } from '@routes/home';
import { AccountToExport } from '@routes/home/AccountsExport/SelectAccountsForQrCode/AccountToExport';
import { commonStyles } from '@utils/commonStyles';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Account } from 'types/account';

type AccountToExport = Account & { selected: boolean };

const SelectAccountsForQrCodeScreen = ({}: NativeStackScreenProps<any>) => {
  const { accounts } = useAccounts();
  const [accountsExportable, setAccountsExportable] = useState<AccountToExport[]>([]);

  useEffect(() => {
    const boot = async () => {
      setAccountsExportable(
        accounts.map((a, index) => ({
          ...a,
          selected: index < MAX_EXPORTABLE,
        })),
      );
    };
    boot();
  }, [accounts]);

  const getQrCode = () => {
    navigate(ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE, { ids: getSelected().map((a) => a.id) });
  };

  const getSelected = () => {
    return accountsExportable.filter((a) => a.selected);
  };

  const onItemPress = (item: AccountToExport) => {
    const items = _.cloneDeep(accountsExportable);
    const i = items.findIndex((a) => a.id === item.id);
    if (!items[i].selected && getSelected().length >= MAX_EXPORTABLE) {
      return;
    }
    items[i].selected = !items[i].selected;
    setAccountsExportable(items);
  };

  const renderItem = (data: { item: AccountToExport; index: number }) => (
    <CustomListItem noPaddingVertical onPress={() => onItemPress(data.item)} style={commonStyles.rowContainer}>
      <AccountToExport account={data.item} checked={data.item.selected} onPress={() => onItemPress(data.item)} />
    </CustomListItem>
  );

  return (
    <PageContainer customHeader={<CustomHeader title={'Esporta Account'} />} useScrollView={false} useSafeArea={true}>
      <CustomView>
        <CustomText>
          Al momento sono presenti <CustomText bold>{accounts.length}</CustomText> account.{'\n'}Con QR code puoi
          esportare un massimo di <CustomText bold>{MAX_EXPORTABLE}</CustomText> account.
        </CustomText>
      </CustomView>
      <CustomView marginTop>
        <CustomText>
          Selezionati: {getSelected().length} / {MAX_EXPORTABLE}
        </CustomText>
      </CustomView>
      <CustomViewMiddle marginTop={12}>
        <CustomRow>
          <CustomFlatListView listData={accountsExportable} renderItem={renderItem} />
        </CustomRow>
      </CustomViewMiddle>
      <CustomViewBottom style={{ flex: 0 }} marginTop={12}>
        <CustomRow>
          <CustomButton full title={'Crea QR'} onClick={getQrCode} color={'primary'} />
        </CustomRow>
      </CustomViewBottom>
    </PageContainer>
  );
};

export { SelectAccountsForQrCodeScreen };
