import React, { useEffect, useRef, useState } from 'react';

import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Keyboard,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

// vedi https://github.com/MinaSamir11/react-native-swipe-modal-up-down
const CustomModalSwipable = ({
  animate = true,
  bottom,
  disableHandAnimation,
  duration,
  onClose,
  closeOnBackButtonClick,
  closeOnBackdropClick,
  fade,
  visible,
  contentModalStyle,
  mainContainerModal,
  openModalDirection,
  pressToAnimateDirection,
  contentModal,
  imageBackgroundModalStyle,
  imageBackgroundModal,
}: Props) => {
  const TIMING_CONFIG = {
    duration: duration ? duration : 400,
    easing: Easing.inOut(Easing.ease),
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const [isAnimating, setIsAnimating] = useState(!!disableHandAnimation);

  let animatedValueX = 0;
  let animatedValueY = 0;

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (isAnimating) {
          return false;
        }
        return gestureState.dy > 22;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: animatedValueX,
          y: animatedValueY,
        });
        pan.setValue({ x: 0, y: 0 }); // Initial value
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // Flatten the offset so it resets the default positioning
        if (gestureState.dy > 0 && gestureState.vy > 0) {
          if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
            setIsAnimating(true);
            onCloseInternal(true);
          } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
            setIsAnimating(true);
            onCloseInternal();
          } else {
            setIsAnimating(true);
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              setIsAnimating(false);
            });
          }
        } else {
          setIsAnimating(true);
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start(() => {
            setIsAnimating(false);
          });
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (visible) {
      animatedValueX = 0;
      animatedValueY = 0;
      pan.setOffset({
        x: animatedValueX,
        y: animatedValueY,
      });
      pan.setValue({
        x: 0,
        y: openModalDirection === 'up' ? -height : height,
      }); // Initial value
      pan.x.addListener((value) => (animatedValueX = value.value));
      pan.y.addListener((value) => (animatedValueY = value.value));
    }
  }, [visible]);

  useEffect(() => {
    if (animate) {
      setIsAnimating(true);
      Animated.timing(pan, {
        toValue: {
          x: 0,
          y: pressToAnimateDirection === 'up' ? -height : height,
        },
        ...TIMING_CONFIG,
        useNativeDriver: false,
      }).start(() => {
        setIsAnimating(false);
        onClose();
      });
    }
  }, [animate]);

  const onCloseInternal = (toTop = false) => {
    Animated.timing(pan, {
      toValue: { x: 0, y: toTop ? height * -1 : height },
      ...TIMING_CONFIG,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
      onClose();
    });
  };

  const handleGetStyle = (opacity: any) => {
    return [
      [
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: opacity,
        },
        [],
      ],
    ];
  };

  const handleGetStyleBody = (opacity: any) => {
    return [
      [
        styles.background,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          opacity: opacity,
        },
      ],
      [contentModalStyle],
    ];
  };
  const handleMainBodyStyle = (opacity: any) => {
    return [
      [
        styles.ContainerModal,
        {
          opacity: opacity,
        },
      ],
      [mainContainerModal],
    ];
  };

  const interpolateBackgroundOpacity = pan.y.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [fade ? 0 : 1, 1, fade ? 0 : 1],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => closeOnBackButtonClick && onCloseInternal()}
      onShow={() => {
        setIsAnimating(true);
        Animated.timing(pan, {
          ...TIMING_CONFIG,
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(() => {
          setIsAnimating(false);
        });
      }}>
      <Animated.View style={handleMainBodyStyle(interpolateBackgroundOpacity)}>
        <Animated.View style={handleGetStyleBody(interpolateBackgroundOpacity)} {...panResponder.panHandlers}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              closeOnBackdropClick && onCloseInternal();
            }}
            style={styles.TouchWithoutFeedBack}>
            <ImageBackground
              source={imageBackgroundModal && imageBackgroundModal}
              style={styles.ImageBackground}
              imageStyle={imageBackgroundModalStyle && imageBackgroundModalStyle}>
              <View
                style={{
                  flex: 1,
                  justifyContent: bottom ? 'flex-end' : 'center',
                }}>
                <Animated.View style={handleGetStyle(interpolateBackgroundOpacity)} {...panResponder.panHandlers}>
                  <TouchableWithoutFeedback>
                    <View style={styles.containerHeader} />
                  </TouchableWithoutFeedback>
                </Animated.View>
                {contentModal}
              </View>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

type Props = {
  contentModal: any;
  visible: boolean;
  bottom?: boolean;
  animate?: boolean;
  disableHandAnimation?: any;
  duration?: any;
  onClose?: any;
  closeOnBackButtonClick?: boolean;
  closeOnBackdropClick?: boolean;
  fade?: any;
  contentModalStyle?: any;
  mainContainerModal?: any;
  openModalDirection?: any;
  pressToAnimateDirection?: any;
  imageBackgroundModalStyle?: any;
  imageBackgroundModal?: any;
};

const styles = StyleSheet.create({
  background: {
    opacity: 0,
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  ContainerModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
  },
  TouchWithoutFeedBack: { flex: 1 },
  container: {
    height: 80,
    top: 50,
    left: 0,
    zIndex: 10,
  },
});

export { CustomModalSwipable };
