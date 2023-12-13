import { defaultStackNavigationOption } from '@navigation/NavigationUtils';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { routes } from '@routes/home';
import * as React from 'react';

export const HomeStackNavigation = () => {
  const Stack = createStackNavigator();

  const genericNoHeaderNavigationOptions: StackNavigationOptions = {
    ...defaultStackNavigationOption,
    headerShown: false,
  };

  return (
    <Stack.Navigator>
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
