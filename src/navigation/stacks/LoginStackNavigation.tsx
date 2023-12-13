import { KEYS, useUserStorage } from '@hooks/useStorage';
import { defaultStackNavigationOption } from '@navigation/NavigationUtils';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { ROUTE_NAMES, routes } from '@routes/login';
import * as React from 'react';

export const LoginStackNavigation = () => {
  const [passcode] = useUserStorage(KEYS.PASSCODE);
  const Stack = createStackNavigator();

  const genericNoHeaderNavigationOptions: StackNavigationOptions = {
    ...defaultStackNavigationOption,
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName={passcode ? ROUTE_NAMES.LOGIN : ROUTE_NAMES.PASSCODE_SETUP}>
      {routes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options ?? genericNoHeaderNavigationOptions}
        />
      ))}
    </Stack.Navigator>
  );
};
