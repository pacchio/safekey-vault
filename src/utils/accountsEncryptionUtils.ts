import { strToJson } from '@utils/commonFunctions';
import { deflate, inflate } from 'react-native-gzip';
import { Account } from 'types/account';
import { v4 } from 'uuid';

const map = {
  ['id']: 'i',
  ['title']: 't',
  ['username']: 'u',
  ['email']: 'e',
  ['password']: 'p',
  ['notes']: 'n',
} as any;

const reverseMap = {
  ['i']: 'id',
  ['t']: 'title',
  ['u']: 'username',
  ['e']: 'email',
  ['p']: 'password',
  ['n']: 'notes',
} as any;

const getMappedObj = (obj: any[], map: Record<string, string>) => {
  return obj.map((a) => {
    const entries = Object.keys(a).map((k) => [map[k], a[k]]);
    return Object.fromEntries(entries);
  });
};

export const decryptAccounts = async (value: string): Promise<Account[] | undefined> => {
  const decompressedValue = await decompress(value);
  const obj = strToJson(decompressedValue);
  const isValidAccounts =
    obj &&
    Array.isArray(obj) &&
    obj.length &&
    (Object.keys(obj[0]).includes('t') || Object.keys(obj[0]).includes('title'));
  if (!isValidAccounts) {
    return;
  }
  return getMappedObj(obj, reverseMap).map((a) => ({ ...a, id: a.id ?? v4() }));
};

export const encryptAccounts = async (accounts: Account[]): Promise<string> => {
  const dataTrimmed = accounts.map(
    (a) =>
      ({
        ...(a.title && ({ title: a.title } as Account)),
        ...(a.username && ({ username: a.username } as Account)),
        ...(a.email && ({ email: a.email } as Account)),
        ...(a.password && ({ password: a.password } as Account)),
        ...(a.notes && ({ notes: a.notes } as Account)),
      } as Account),
  );
  const mappedObj = getMappedObj(dataTrimmed, map);
  const data = JSON.stringify(mappedObj);
  return await compress(data);
};

const compress = async (data: string): Promise<string> => {
  try {
    return await deflate(data);
  } catch (err) {
    console.log('Error while compressing', err);
    return '';
  }
};

const decompress = async (data: string): Promise<string> => {
  try {
    return await inflate(data);
  } catch (err) {
    console.log('Error while decompressing', err);
    return '';
  }
};
