import { Colors } from '@styles/index';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const CustomLoader = ({ whiteBackground }: Props) => {
  return (
    <>
      <View
        style={{
          ...styles.background,
          backgroundColor: whiteBackground ? Colors.WHITE : Colors.GRAY_MEDIUM_TRASPARENT,
        }}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color={Colors.PRIMARY} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    // backgroundColor: Colors.WHITE,
    // height: 100,
    // width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

type Props = {
  whiteBackground?: boolean;
};

export { CustomLoader };
