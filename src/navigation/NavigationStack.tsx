import { getActiveRouteName, navigationRef } from '@navigation/NavigationService';
import { LoginStackNavigation } from '@navigation/stacks/LoginStackNavigation';
import { HomeDrawerNavigation } from '@navigation/stacks/HomeDrawerNavigation';
import { IntroStackNavigation } from '@navigation/stacks/IntroStackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreenRoute } from '@routes/splashscreen';
import { common, user } from '@store/slices';
import * as React from 'react';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator();

export const Navigator = ({ initCompleted }: Props) => {
  const dispatch = useDispatch();
  const routeNameRef = React.useRef<string>();
  const isFirstAccess = false;
  const isLoggedIn = useSelector(user.selectors.isLoggedIn);

  useEffect(() => {
    if (initCompleted) {
      SplashScreen.hide();
    }
  }, [initCompleted]);

  const onStateChange = async (state: any) => {
    if (!state) {
      return;
    }
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);
    dispatch(common.actions.setCurrentPage(currentRouteName));
    if (previousRouteName !== currentRouteName) {
      // TODO: await analyticsService.logScreenView(currentRouteName);
    }
    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onStateChange}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}>
      {!initCompleted ? (
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreenRoute} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : isFirstAccess ? (
        <IntroStackNavigation />
      ) : !isLoggedIn ? (
        <LoginStackNavigation />
      ) : (
        <HomeDrawerNavigation />
      )}
    </NavigationContainer>
  );
};

type Props = {
  initCompleted: boolean;
};
