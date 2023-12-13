import { defaultStackNavigationOption } from '@navigation/NavigationUtils';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { routes } from '@routes/intro';
import * as React from 'react';

export const IntroStackNavigation = () => {
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
