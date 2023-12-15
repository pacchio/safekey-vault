import { StackNavigationOptions } from '@react-navigation/stack';
import { AccountDetailScreen, ParamsList as ItemDetailParamsList } from './AccountDetail';
import { AccountExportScreen } from './AccountsExport';
import { AccountImportScreen } from './AccountsImport';
import { AccountsListScreen } from './AccountsList';
import { AddAccountScreen } from './AddAccount';

export const ROUTE_NAMES = {
  ACCOUNTS_LIST: 'home/AccountsList',
  ACCOUNT_DETAIL: 'home/AccountDetail',
  ADD_ACCOUNT: 'home/AddAccount',
  ACCOUNT_IMPORT: 'home/AccountImport',
  ACCOUNT_EXPORT: 'home/AccountExport',
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
  [ROUTE_NAMES.ACCOUNT_IMPORT]: {
    component: AccountImportScreen,
    name: ROUTE_NAMES.ACCOUNT_IMPORT,
  },
  [ROUTE_NAMES.ACCOUNT_EXPORT]: {
    component: AccountExportScreen,
    name: ROUTE_NAMES.ACCOUNT_EXPORT,
  },
};
export type ParamsList = ItemDetailParamsList;
export const routes = Object.keys(routeMap).map((route) => routeMap[route as RouteType] as Route);
