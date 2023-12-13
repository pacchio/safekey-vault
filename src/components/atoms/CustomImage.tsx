import * as React from 'react';
import { Animated, ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import FastImage, { Source } from 'react-native-fast-image';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const CustomImage = ({ uri, src, imgStyle, animate = false, resizeMode }: Props) => {
  const scale = new Animated.Value(1);

  const onZoomEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  });

  const onZoomStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      {(src || uri) && (
        <View>
          {animate ? (
            <PinchGestureHandler onGestureEvent={onZoomEvent} onHandlerStateChange={onZoomStateChange}>
              <Animated.View>
                <AnimatedFastImage
                  style={[styles.image, imgStyle, { transform: [{ scale }] }]}
                  source={
                    src
                      ? src
                      : {
                          uri: uri,
                          priority: FastImage.priority.normal,
                        }
                  }
                  resizeMode={resizeMode}
                />
              </Animated.View>
            </PinchGestureHandler>
          ) : (
            <FastImage
              style={[styles.image, imgStyle]}
              source={
                src
                  ? src
                  : {
                      uri: uri,
                      priority: FastImage.priority.normal,
                    }
              }
              resizeMode={resizeMode}
            />
          )}
        </View>
      )}
    </>
  );
};

type Props = {
  uri?: string;
  src?: Source;
  imgStyle?: ImageStyle | ViewStyle | TextStyle | any;
  animate?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});

export { CustomImage };
