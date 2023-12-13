import { StackNavigationOptions } from '@react-navigation/stack';
import { PasscodeSetUpConfirmScreen } from './PasscodeSetUpConfirm';
import { BiometricRegistrationScreen } from './BiometricRegistration';
import { LoginScreen } from './Login';
import { PasscodeSetUpScreen } from './PasscodeSetUp';

export const ROUTE_NAMES = {
  BIOMETRIC_REGISTRATION: 'login/BiometricRegistration',
  LOGIN: 'login/Login',
  PASSCODE_SETUP: 'login/PasscodeSetUp',
  PASSCODE_SETUP_CONFIRM: 'login/PasscodeSetUpConfirm',
} as const;

type RouteType = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
type Route = {
  component: any;
  name: RouteType;
  options?: StackNavigationOptions;
};

const routeMap: Record<RouteType, Route> = {
  [ROUTE_NAMES.LOGIN]: {
    component: LoginScreen,
    name: ROUTE_NAMES.LOGIN,
  },
  [ROUTE_NAMES.PASSCODE_SETUP]: {
    component: PasscodeSetUpScreen,
    name: ROUTE_NAMES.PASSCODE_SETUP,
  },
  [ROUTE_NAMES.PASSCODE_SETUP_CONFIRM]: {
    component: PasscodeSetUpConfirmScreen,
    name: ROUTE_NAMES.PASSCODE_SETUP_CONFIRM,
  },
  [ROUTE_NAMES.BIOMETRIC_REGISTRATION]: {
    component: BiometricRegistrationScreen,
    name: ROUTE_NAMES.BIOMETRIC_REGISTRATION,
  },
};
export const routes = Object.keys(routeMap).map((route) => routeMap[route as RouteType] as Route);
