import { Colors, Spacing, Typography } from '@styles/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

export const CustomTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      activeColor={Colors.PRIMARY}
      inactiveColor={Colors.BLACK_SMOKED}
      labelStyle={mStyles.label}
      indicatorStyle={mStyles.tabBarIndicator}
      style={mStyles.tabBar}
    />
  );
};

const CustomTabsView = ({ renderScene, routes, style, swipeEnabled = true }: Props) => {
  const [index, setIndex] = React.useState(0);
  return (
    <TabView
      swipeEnabled={swipeEnabled}
      renderTabBar={CustomTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={[mStyles.base, style]}
    />
  );
};

const mStyles = StyleSheet.create({
  base: {},
  tabBar: {
    backgroundColor: Colors.WHITE,
  },
  tabBarIndicator: {
    backgroundColor: Colors.PRIMARY,
    height: Spacing.SCALE_6,
  },
  label: {
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

type Props = {
  renderScene: any;
  routes: any;
  style?: Object;
  swipeEnabled?: boolean;
};

export { CustomTabsView };
