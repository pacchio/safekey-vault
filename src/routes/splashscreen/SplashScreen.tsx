import splash_icon from '@assets/images/logo/launch_screen.png';
import { CustomRow } from '@components/atoms';
import { Colors } from '@styles/index';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@styles/mixins';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

export const SplashScreenRoute = () => {
  return (
    <View style={styles.container}>
      <CustomRow style={{ textAlign: 'center' }}>
        <Image source={splash_icon} style={styles.image} />
      </CustomRow>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: WINDOW_HEIGHT,
    backgroundColor: Colors.WHITE,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  videoContainer: {
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  video: {
    flex: 1,
    width: WINDOW_WIDTH,
    height: 150,
  },
});
