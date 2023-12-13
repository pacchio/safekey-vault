import { KEYS, useUserStorage } from '@hooks/useStorage';
import { useEffect, useState } from 'react';
import { Account } from 'types/account';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsStored, setAccountsStored] = useUserStorage(KEYS.ACCOUNTS);

  useEffect(() => {
    if (accountsStored) {
      setAccounts(JSON.parse(accountsStored as string));
    }
  }, [accountsStored]);

  const updateAccounts = (_accounts: Account[]) => {
    setAccountsStored(JSON.stringify(_accounts));
    setAccounts(_accounts);
  };

  return { accounts, setAccounts: updateAccounts };
};
