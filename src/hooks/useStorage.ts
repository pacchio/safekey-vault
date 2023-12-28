import { useMMKV } from 'react-native-mmkv';

const APP_STORAGE_ID = 'app-storage';
const USER_STORAGE_ID = 'user-storage';

export const KEYS = {
  PASSCODE: 'PASSCODE',
  ACCOUNTS: 'ACCOUNTS',
  SETTINGS: 'SETTINGS',
};

type StorageValue = boolean | string | number | Uint8Array;
type Storage = [value: StorageValue | undefined, setValue: (value: StorageValue) => void, clearAll: () => void];

const useStorage = (storageID: string, key: string, defaultValue?: StorageValue): Storage => {
  const storage = useMMKV({
    id: storageID,
  });

  return [
    storage.getString(key) ?? defaultValue,
    (value: StorageValue) => storage.set(key, value ?? defaultValue),
    () => storage.clearAll(),
  ];
};

export const useAppStorage = (key: string, defaultValue?: StorageValue): Storage => {
  return useStorage(APP_STORAGE_ID, key, defaultValue);
};

export const useUserStorage = (key: string, defaultValue?: StorageValue): Storage => {
  return useStorage(USER_STORAGE_ID, key, defaultValue);
};
