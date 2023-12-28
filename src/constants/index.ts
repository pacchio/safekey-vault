import { AppSetting } from 'types/app-setting';

export const MAX_EXPORTABLE = 100;

export const SETTINGS_KEYS = {
  FACE_ID_AUTO: 'face-id-auto',
  DARK_MODE: 'dark-mode',
};

export const SETTINGS: AppSetting[] = [
  {
    key: SETTINGS_KEYS.FACE_ID_AUTO,
    title: 'Face ID Auto',
    description: 'Richiedi il Face ID in automatico al login',
    type: 'boolean',
    defaultValue: true,
  },
  {
    key: SETTINGS_KEYS.DARK_MODE,
    title: 'Dark mode',
    description: 'Modalità scura attiva',
    type: 'boolean',
    defaultValue: false,
  },
];
