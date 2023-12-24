import { HomeDrawerContentComponent } from '@navigation/stacks/HomeDrawerContent';
import { HomeStackNavigation } from '@navigation/stacks/HomeStackNavigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTE_NAMES } from '@routes/home';
import { RootState } from '@store/index';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HomeDrawerNavigation = () => {
  const page = useSelector((state: RootState) => state.common.currentPage);
  const Drawer = createDrawerNavigator();
  const [initRender, setInitRender] = useState(true);

  useEffect(() => {
    setInitRender(false);
  }, [initRender]);

  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEdgeWidth: 180,
        drawerStyle: { width: initRender ? undefined : '75%' },
        drawerPosition: 'right',
        drawerType: 'slide',
        headerShown: false,
      }}
      drawerContent={(drawerProps) => <HomeDrawerContentComponent {...drawerProps} />}>
      <Drawer.Screen name="HomeMainPage" component={HomeStackNavigation} options={{ swipeEnabled: false }} />
    </Drawer.Navigator>
  );
};

export { HomeDrawerNavigation };
