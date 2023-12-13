import { useEffect, useState } from 'react';
import ReactNativeBiometrics, { BiometryType } from 'react-native-biometrics';

type CreateSignatureOptions = {
  promptMessage: string;
  payload: string;
  cancelButtonText?: string;
};

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

export const useBiometrics = () => {
  const [biometryType, setBiometryType] = useState<BiometryType>();
  const [available, setAvailable] = useState<boolean>();
  const [keysExist, setKeysExist] = useState<boolean>();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const { available: _available, biometryType: _biometryType } = await rnBiometrics.isSensorAvailable();
      setAvailable(_available);
      setBiometryType(_biometryType);
      const { keysExist: _keysExist } = await rnBiometrics.biometricKeysExist();
      setKeysExist(_keysExist);
    };
    bootstrapAsync();
  }, []);

  const deleteKeys = async () => {
    return rnBiometrics.deleteKeys();
  };

  const createSignature = async (options: CreateSignatureOptions) => {
    return rnBiometrics.createSignature(options);
  };

  const simplePrompt = async (promptMessage?: string) => {
    return rnBiometrics.simplePrompt({ promptMessage: promptMessage ?? 'Setup Biometrics' });
  };

  return {
    biometryType,
    available,
    keysExist,
    deleteKeys,
    createSignature,
    simplePrompt,
  };
};
