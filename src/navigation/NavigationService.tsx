import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  // @ts-ignore
  return navigationRef.navigate(name, params ?? {});
}

export const isNavigationReady = () => {
  return navigationRef.isReady();
};

export function dispatchNavigate(action: any) {
  navigationRef.dispatch(action);
}

export function goBack() {
  navigationRef.goBack();
}

export const getActiveRouteName = (state: any): any => {
  const route = state.routes[state?.index || 0];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};
