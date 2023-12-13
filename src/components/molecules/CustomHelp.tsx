import { CustomText, CustomRow, CustomModal, CustomIcon, CustomButton } from '@components/atoms';
import { Colors, Spacing } from '@styles/index';
import { scaleSize } from '@styles/mixins';
import { ICON_SIZE_MEDIUM } from '@styles/spacing';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const CustomHelp = ({ help }: Props) => {
  const [helpVisible, setHelpVisibile] = useState(false);
  return (
    <>
      <View style={styles.buttonContainer}>
        <CustomButton
          trasparent
          icon={'help'}
          padding={'xs'}
          iconSize={scaleSize(22)}
          color={'primary'}
          onClick={() => setHelpVisibile(true)}
        />
      </View>
      <CustomModal visibile={helpVisible} onBackdropPress={() => setHelpVisibile(false)}>
        <View style={styles.modalContent}>
          <View style={styles.closeContainer}>
            <CustomIcon color={'white'} icon={'close'} size={ICON_SIZE_MEDIUM} onClick={() => setHelpVisibile(false)} />
          </View>
          <CustomRow center style={styles.iconContainer}>
            <CustomIcon icon={'live-help'} color={'primary'} size={scaleSize(80)} />
          </CustomRow>
          <CustomRow marginTop center>
            <CustomText center bold color={'primary'}>
              {help.title}
            </CustomText>
          </CustomRow>
          <CustomRow marginTop center>
            <CustomText center>{help.text}</CustomText>
          </CustomRow>
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    marginLeft: Spacing.SCALE_8,
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Spacing.SCALE_20,
    paddingHorizontal: Spacing.SCALE_20,
    borderRadius: 10,
  },
  iconContainer: {},
  closeContainer: {
    position: 'absolute',
    top: -30,
    right: 4,
  },
});

type Props = {
  help: {
    title: string;
    text: string;
  };
};

export { CustomHelp };
