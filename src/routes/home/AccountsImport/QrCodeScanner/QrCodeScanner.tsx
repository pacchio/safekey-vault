import { useStyleSheet } from '@hooks/useStyleSheet';
import { Colors } from '@styles/index';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';

type Props = {
  onCodeFinded: (value: string) => void;
};

const QrScanner = ({ onCodeFinded }: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const transalteY = useSharedValue(500);
  const styles = useStyleSheet(useStyles());

  /**
   * VisionCamera Frame Processor Plugin to read barcodes using MLKit Vision Barcode Scanning
   */
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE, BarcodeFormat.ALL_FORMATS], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const AnimatedScaning = useAnimatedStyle(() => ({
    transform: [{ translateY: transalteY.value }],
  }));

  useEffect(() => {
    transalteY.value = withRepeat(withTiming(-transalteY.value, { duration: 2000 }), 5, true);
  }, []);

  useEffect(() => {
    if (barcodes?.length) {
      const values = barcodes.map((b) => b.rawValue ?? '').filter((x) => !!x);
      onCodeFinded(values[values.length - 1]);
    }
  }, [barcodes]);

  return (
    device != null &&
    hasPermission && (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Camera
          style={StyleSheet.absoluteFillObject}
          collapsable
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          fps={30}
          focusable={true}
          photo={true}
        />
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'white',
            width: 250,
            height: 250,
            alignSelf: 'center',
            backgroundColor: Colors.TRASPARENT,
            overflow: 'hidden',
          }}>
          <Animated.View style={[{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'white' }, AnimatedScaning]} />
        </View>
      </View>
    )
  );
};

export { QrScanner };

const useStyles = () => {
  const { height } = useWindowDimensions();
  return StyleSheet.create({
    barcodeTextURL: {
      fontSize: 10,
      color: 'white',
      fontWeight: 'bold',
    },
    barCodeTextView: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 15,
      backgroundColor: Colors.PRIMARY,
      top: height / 2,
      borderWidth: StyleSheet.hairlineWidth,
      position: 'absolute',
    },
  });
};
