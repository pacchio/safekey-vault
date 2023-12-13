import { Colors } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

const CustomFlatListView = ({ listData, renderItem, lastItem, loadMoreActions, initialNumToRender, style }: Props) => {
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);
  const { colors, isDark } = useTheme();

  const scrollStyle: any =
    !listData || listData.length === 0
      ? { ...mStyles.scrollContainer, justifyContent: 'center' }
      : { ...mStyles.scrollContainer };

  const mContainerStyle = {
    ...mStyles.container,
    backgroundColor: colors.backgroundPage,
  };

  const loadMore = async () => {
    if (loadMoreActions && !lastItem && !onEndReachedCalledDuringMomentum) {
      await loadMoreActions();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <View style={[mContainerStyle, style]}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollStyle}
        keyExtractor={(item, index) => index.toString()}
        data={listData}
        renderItem={renderItem}
        initialNumToRender={initialNumToRender || 20}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        onMomentumScrollEnd={() => setOnEndReachedCalledDuringMomentum(false)}
        ListFooterComponent={() =>
          loadMoreActions && !lastItem ? <ActivityIndicator color={Colors.PRIMARY} /> : <></>
        }
      />
    </View>
  );
};

const mStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
});

type Props = {
  listData: any;
  renderItem: any;
  style?: Object;
  lastItem?: boolean;
  loadMoreActions?: () => Promise<void>;
  initialNumToRender?: number;
};

export { CustomFlatListView };
