import { StackNavigationOptions } from '@react-navigation/stack';
import { SlidersListScreen } from './SlidersList';

export const ROUTE_NAMES = {
  SLIDERS: 'intro/SlidersList',
} as const;

type RouteType = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
type Route = {
  component: any;
  name: RouteType;
  options?: StackNavigationOptions;
};

const routeMap: Record<RouteType, Route> = {
  [ROUTE_NAMES.SLIDERS]: {
    component: SlidersListScreen,
    name: ROUTE_NAMES.SLIDERS,
  },
};
export const routes = Object.keys(routeMap).map((route) => routeMap[route as RouteType] as Route);
