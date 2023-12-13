import { CustomButton } from '@components/atoms';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, ImageStyle, SafeAreaView, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const CustomBackButton = ({ styles, color = 'primary', marginLeft }: Props) => {
  const navigation = useNavigation();
  return (
    <>
      <Animated.View style={[{ marginLeft: marginLeft ? 8 : 0 }, styles]}>
        {/*<HeaderBackButton*/}
        {/*  tintColor={color}*/}
        {/*  onPress={() => navigation.goBack()}*/}
        {/*/>*/}
        <SafeAreaView>
          <CustomButton
            trasparent
            icon={'keyboard-arrow-left'}
            padding={'xs'}
            color={color}
            onClick={() => navigation.goBack()}
          />
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

type Props = {
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  styles?: ImageStyle | ViewStyle | TextStyle | any;
  marginLeft?: boolean;
};

export { CustomBackButton };
