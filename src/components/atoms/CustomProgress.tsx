import { Colors } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';

const CustomProgress = ({
  style,
  containerStyle,
  color = 'primary',
  type,
  progress,
  width = null,
  indeterminate = false,
}: Props) => {
  const { colors, isDark } = useTheme();
  let progressColor =
    color === 'primary'
      ? Colors.PRIMARY
      : color === 'secondary'
      ? Colors.SECONDARY
      : color === 'accent'
      ? Colors.ACCENT
      : color === 'white'
      ? Colors.WHITE
      : Colors.GRAY_LIGHT;

  progressColor =
    isDark && [Colors.WHITE, Colors.WHITE_SMOKED, Colors.GRAY_LIGHT, '', undefined].includes(progressColor || '')
      ? colors.background
      : progressColor;

  return (
    <View style={[containerStyle]}>
      {type === 'bar' && (
        <Progress.Bar
          style={[mStyles.baseStyle, style]}
          progress={progress}
          color={progressColor}
          width={width}
          height={7}
          indeterminate={indeterminate}
        />
      )}
      {type === 'pie' && (
        <Progress.Pie
          style={[mStyles.baseStyle, style]}
          progress={progress}
          color={progressColor}
          indeterminate={indeterminate}
        />
      )}
      {type === 'circle' && (
        <Progress.Circle
          style={[mStyles.baseStyle, style]}
          progress={progress}
          color={progressColor}
          indeterminate={indeterminate}
        />
      )}
      {type === 'circle-snail' && (
        <Progress.CircleSnail
          style={[mStyles.baseStyle, style]}
          progress={progress}
          color={progressColor}
          indeterminate={indeterminate}
        />
      )}
    </View>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {},
});

type Props = {
  style?: ViewStyle | TextStyle | ImageStyle;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  type: 'bar' | 'pie' | 'circle' | 'circle-snail';
  progress: number;
  width?: number | null;
  indeterminate?: boolean;
};

export { CustomProgress };
