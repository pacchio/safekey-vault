import { Dimensions, PixelRatio } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const guidelineBaseWidth = 375;

export const scaleSize = (size: number) => {
  const newSize = (WINDOW_WIDTH / guidelineBaseWidth) * size;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const scaleFont = (size: number) => scaleSize(size);
