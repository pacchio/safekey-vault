import Config from 'react-native-config';

export const config: AppConfig = Config as any;

export const isProd = () => {
  return config.ENVIRONMENT === Profile.PROD;
};

console.log('================= CONFIG LOADED =================\n', config);

export const global = {};

export enum Profile {
  DEV = 'development',
  PROD = 'production',
}

type AppConfig = {
  // base
  APPLICATION_ID: string;
  VERSION_CODE: number;
  VERSION_NAME: string;
  BUILD_TYPE: 'debug' | 'release';
  DEBUG: boolean;
  // custom
  ENVIRONMENT: string;
};
