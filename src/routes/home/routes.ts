import { StackNavigationOptions } from '@react-navigation/stack';
import { AccountDetailScreen, ParamsList as ItemDetailParamsList } from './AccountDetail';
import { QrCodeScreen, SelectAccountsForQrCodeScreen, SelectExportMethodScreen } from './AccountsExport';
import { AccountImportScreen, AccountImportScanQrScreen } from './AccountsImport';
import { AccountsListScreen } from './AccountsList';
import { AddAccountScreen } from './AddAccount';
import { SettingsScreen } from './Settings';

export const ROUTE_NAMES = {
  ACCOUNTS_LIST: 'home/AccountsList',
  ACCOUNT_DETAIL: 'home/AccountDetail',
  ADD_ACCOUNT: 'home/AddAccount',
  ACCOUNT_IMPORT_SELECT_METHOD: 'home/AccountImport/SelectMethod',
  ACCOUNT_IMPORT_QR_CODE_SCANNER: 'home/AccountImport/QrCodeScanner',
  ACCOUNT_EXPORT_SELECT_METHOD: 'home/AccountExport/SelectMethod',
  ACCOUNT_EXPORT_SELECT_ACCOUNTS_FOR_QRCODE: 'home/AccountExport/SelectAccountsForQrCode',
  ACCOUNT_EXPORT_QR_CODE: 'home/AccountExport/QrCode',
  SETTINGS: 'home/Settings',
} as const;

type RouteType = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
type Route = {
  component: any;
  name: RouteType;
  options?: StackNavigationOptions;
};

const routeMap: Record<RouteType, Route> = {
  [ROUTE_NAMES.ACCOUNTS_LIST]: {
    component: AccountsListScreen,
    name: ROUTE_NAMES.ACCOUNTS_LIST,
  },
  [ROUTE_NAMES.ACCOUNT_DETAIL]: {
    component: AccountDetailScreen,
    name: ROUTE_NAMES.ACCOUNT_DETAIL,
  },
  [ROUTE_NAMES.ADD_ACCOUNT]: {
    component: AddAccountScreen,
    name: ROUTE_NAMES.ADD_ACCOUNT,
  },
  [ROUTE_NAMES.ACCOUNT_IMPORT_SELECT_METHOD]: {
    component: AccountImportScreen,
    name: ROUTE_NAMES.ACCOUNT_IMPORT_SELECT_METHOD,
  },
  [ROUTE_NAMES.ACCOUNT_IMPORT_QR_CODE_SCANNER]: {
    component: AccountImportScanQrScreen,
    name: ROUTE_NAMES.ACCOUNT_IMPORT_QR_CODE_SCANNER,
  },
  [ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_METHOD]: {
    component: SelectExportMethodScreen,
    name: ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_METHOD,
  },
  [ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_ACCOUNTS_FOR_QRCODE]: {
    component: SelectAccountsForQrCodeScreen,
    name: ROUTE_NAMES.ACCOUNT_EXPORT_SELECT_ACCOUNTS_FOR_QRCODE,
  },
  [ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE]: {
    component: QrCodeScreen,
    name: ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE,
  },
  [ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE]: {
    component: QrCodeScreen,
    name: ROUTE_NAMES.ACCOUNT_EXPORT_QR_CODE,
  },
  [ROUTE_NAMES.SETTINGS]: {
    component: SettingsScreen,
    name: ROUTE_NAMES.SETTINGS,
  },
};
export type ParamsList = ItemDetailParamsList;
export const routes = Object.keys(routeMap).map((route) => routeMap[route as RouteType] as Route);
