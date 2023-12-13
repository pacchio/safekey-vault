import { CustomBackButton } from '@components/molecules';
import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { commonStyles } from '@utils/commonStyles';
import React from 'react';
import { Animated, View } from 'react-native';

const CustomHeaderLeft = () => {
  return (
    <View>
      <CustomBackButton marginLeft />
    </View>
  );
};

export const headerStackNavigationOption: StackNavigationOptions = {
  headerStyle: commonStyles.headerStyle,
  headerTitleStyle: commonStyles.headerTitle,
  headerTitleAlign: 'center',
  gestureEnabled: false,
};

export const defaultStackNavigationOption: StackNavigationOptions = {
  ...headerStackNavigationOption,
  gestureDirection: 'horizontal',
  gestureEnabled: true,
  headerLeft: CustomHeaderLeft,
  cardStyleInterpolator: forHorizontalModal,
};

export function forHorizontalModal({
  current,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateFocused = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: 'clamp',
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      transform: [{ translateX: translateFocused }, { translateX: 0 }],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
}
