import { Colors, Spacing } from '@styles/index';
import { FONT_FAMILY_OPENSANS, FONT_SIZE_PAGE_HEADER } from '@styles/typography';
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  headerStyle: {
    shadowColor: Colors.GRAY_DARK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 24,
  },
  headerTitle: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY_OPENSANS,
    fontSize: FONT_SIZE_PAGE_HEADER,
    alignSelf: 'center',
  },
  menuItem: {
    backgroundColor: Colors.WHITE,
    paddingLeft: Spacing.MARGIN_FROM_BOARD,
    paddingRight: Spacing.MARGIN_FROM_BOARD,
    paddingVertical: Spacing.SCALE_12,
  },
  rowContainer: {
    paddingLeft: Spacing.MARGIN_FROM_BOARD,
    paddingRight: Spacing.MARGIN_FROM_BOARD,
    backgroundColor: Colors.WHITE,
  },
  rowBack: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: Spacing.SCALE_16,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Spacing.SCALE_60,
    backgroundColor: Colors.PRIMARY,
  },
  headerSpacing: {
    paddingHorizontal: Spacing.MARGIN_FROM_BOARD,
    paddingVertical: Spacing.MARGIN_FROM_BOARD,
  },
});
