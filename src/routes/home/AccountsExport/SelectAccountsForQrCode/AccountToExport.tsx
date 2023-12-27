import { CustomCheckBox, CustomRow, CustomText } from '@components/atoms';
import React from 'react';
import { Account } from 'types/account';

const AccountToExport = ({ account, checked, onPress }: Props) => {
  return (
    <CustomCheckBox itemDivider checked={checked} onPress={onPress}>
      <CustomRow>
        <CustomText>{account.title}</CustomText>
      </CustomRow>
    </CustomCheckBox>
  );
};

type Props = {
  account: Account;
  checked: boolean;
  onPress: any;
};

export { AccountToExport };
