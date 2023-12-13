import { toastConfig, CustomText, CustomRow, CustomIcon, CustomButton } from '@components/atoms';
import { Colors, Spacing } from '@styles/index';
import React from 'react';
import { ImageStyle, StyleSheet, TextStyle, TouchableHighlight, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

export const CustomModalMenuElement = ({ text, icon, style, onPress }: Props2) => {
  return (
    <TouchableHighlight
      style={[
        style,
        {
          paddingVertical: Spacing.SCALE_20,
          paddingHorizontal: Spacing.SCALE_50,
        },
      ]}
      underlayColor={Colors.GRAY_MEDIUM}
      onPress={onPress}>
      <CustomRow>
        <CustomText>{text}</CustomText>
        {icon ? <CustomIcon icon={icon} style={{ marginLeft: Spacing.SCALE_20 }} /> : null}{' '}
      </CustomRow>{' '}
    </TouchableHighlight>
  );
};

type Props2 = {
  text?: string;
  icon?: string;
  onPress?: any;
  style?: ViewStyle | TextStyle | ImageStyle;
};

export const CustomModalCloseBtn = ({ onClose }: Props3) => {
  return (
    <>
      {onClose && (
        <View style={mStyles.closeContainer}>
          <CustomButton style={{ paddingVertical: 4 }} trasparent color={'black'} icon={'close'} onClick={onClose} />
        </View>
      )}
    </>
  );
};

type Props3 = {
  onClose?: () => void;
};

const CustomModal = ({
  visibile,
  bottom,
  style,
  onSwipeMove,
  onBackdropPress,
  onBackButtonPress,
  animationIn,
  animationOut,
  animationTiming,
  children,
}: Props) => {
  const baseStyle = bottom
    ? { ...mStyles.baseStyle, justifyContent: 'flex-end', marginBottom: 0 }
    : { ...mStyles.baseStyle };

  const onSwipeMoveFunc = (p: number) => {
    if (p < 0.5) {
      onSwipeMove && onSwipeMove();
    }
  };

  return (
    <Modal
      isVisible={visibile}
      style={[baseStyle, style] as any}
      animationIn={animationIn || 'slideInUp'}
      animationOut={animationOut || 'slideOutDown'}
      animationInTiming={animationTiming || 500}
      animationOutTiming={animationTiming || 500}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={0}
      swipeThreshold={50}
      backdropOpacity={0.3}
      onBackButtonPress={onBackButtonPress ? onBackButtonPress : () => null}
      propagateSwipe={true}
      swipeDirection={onSwipeMove ? 'down' : undefined}
      onSwipeMove={(p) => onSwipeMoveFunc(p)}
      onBackdropPress={onBackdropPress ? onBackdropPress : () => null}>
      {children}
      <Toast config={toastConfig} />
    </Modal>
  );
};

const mStyles = StyleSheet.create({
  baseStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeContainer: {
    position: 'absolute',
    top: 10,
    right: 4,
  },
});

type Props = {
  visibile: boolean;
  bottom?: boolean;
  noPadding?: boolean;
  onSwipeMove?: any;
  onBackdropPress?: any;
  onBackButtonPress?: any;
  style?: ViewStyle | TextStyle | ImageStyle;
  animationIn?: string | any;
  animationOut?: string | any;
  animationTiming?: number;
  children?: any;
};

export { CustomModal };
