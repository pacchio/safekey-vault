import { scaleFont } from './mixins';
import { Platform } from 'react-native';

// FONT FAMILY
export const FONT_FAMILY_OPENSANS = 'OpenSans-Regular';
export const FONT_FAMILY_OPENSANS_BOLD = 'OpenSans-Bold';
export const FONT_FAMILY_VERDANA = 'Verdana';
export const FONT_FAMILY_VERDANA_BOLD = 'Verdana-Bold';

export const FONT_FAMILY_APP = FONT_FAMILY_OPENSANS;
export const FONT_FAMILY_BOLD_APP = FONT_FAMILY_OPENSANS_BOLD;

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_45 = scaleFont(45);
export const FONT_SIZE_30 = scaleFont(30);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_8 = scaleFont(8);

export const FONT_SIZE_SMALL = FONT_SIZE_12;
export const FONT_SIZE_MEDIUM = FONT_SIZE_14;
export const FONT_SIZE_BIG = FONT_SIZE_20;
export const FONT_SIZE_PAGE_HEADER = Platform.OS === 'ios' ? FONT_SIZE_20 : FONT_SIZE_22;

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);
