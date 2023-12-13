import { Spacing } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const CustomSwipeListView = ({
  listData,
  renderItem,
  renderHiddenItem,
  onRowDidOpen,
  numberOfHiddenItem = 1,
  showPreview = true,
  style,
}: Props) => {
  const { colors } = useTheme();
  const mContainerStyle = {
    ...mStyles.container,
    backgroundColor: colors.backgroundPage,
  };
  return (
    <View style={[mContainerStyle, style]}>
      <SwipeListView
        bounces={false}
        data={listData.map((e: any, i: number) => ({ ...e, key: `${i}` }))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe
        leftOpenValue={Spacing.SCALE_60 * numberOfHiddenItem}
        rightOpenValue={-(Spacing.SCALE_60 * numberOfHiddenItem)}
        previewRowKey={showPreview ? '0' : undefined}
        previewOpenValue={-Spacing.SCALE_40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen ? onRowDidOpen : () => {}}
      />
    </View>
  );
};

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type Props = {
  listData: any;
  renderItem: any;
  renderHiddenItem?: any;
  onRowDidOpen?: any;
  numberOfHiddenItem?: number;
  showPreview?: boolean;
  style?: Object;
};

export { CustomSwipeListView };
