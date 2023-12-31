export const PRIMARY = '#263032';
export const PRIMARY_TRASPARENT = '#26303230';
export const PRIMARY_DARK = '#1F2426';
export const SECONDARY = '#5CE0E6';
export const ACCENT = '#AD3ECD';

export const FACEBOOK = '#3b5998';
export const INSTAGRAM = '#DD2A7B';
export const WHATSAPP = '#25D366';
export const CRYPTO_COM = '#011f42';

// ACTIONS
export const SUCCESS = '#69C779';
export const WARNING = '#ffae00';
export const ERROR = '#cc4b37';
export const INFO = '#87CEFA';

// GRAYSCALE
export const TRASPARENT = '#00000000';
export const WHITE = '#FFFFFF';
export const WHITE_SMOKED = '#f8f8f8';
export const GRAY_LIGHT = '#e9e9e9';
export const GRAY_MEDIUM = '#d7d7d7';
export const GRAY_DARK = '#8a8a8a';
export const BLACK_SMOKED_LIGHT = '#2f2f2f';
export const BLACK_SMOKED = '#2B2422';
export const BLACK = '#000000';
export const GRAY_MEDIUM_TRASPARENT = '#cacaca80';
export const GRAY_DARK_TRASPARENT = '#00000080';

export const BACKGROUND_PAGE_COLOR = WHITE_SMOKED;

export const lightColors = {
  backgroundPage: WHITE_SMOKED,
  backgroundHeader: WHITE,
  backgroundInput: GRAY_LIGHT,
  background: WHITE,
  primary: PRIMARY,
  text: BLACK_SMOKED,
  buttonText: WHITE,
};

export const darkColors = {
  backgroundPage: BLACK_SMOKED_LIGHT,
  backgroundHeader: BLACK_SMOKED_LIGHT,
  backgroundInput: PRIMARY_DARK,
  background: BLACK_SMOKED_LIGHT,
  primary: PRIMARY_DARK,
  text: GRAY_MEDIUM,
  buttonText: WHITE,
};

export type ColorType = 'primary' | 'secondary' | 'accent' | 'white' | 'black' | 'gray' | string;
