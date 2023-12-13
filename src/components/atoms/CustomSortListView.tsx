import { CustomSwipableRowItem } from '@components/atoms';
import { Colors } from '@styles/index';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, UIManager, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';

const isAndroid = Platform.OS === 'android';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomSortListView = React.forwardRef(
  (
    { data, renderItem, renderHiddenItemLeft, renderHiddenItemRight, numberOfHiddenItem = 1, onDragEnd, style }: Props,
    ref,
  ) => {
    const [listData, setListData] = useState<any[]>([]);
    const itemRefs = useRef(new Map());

    useEffect(() => {
      setListData(
        data.map((d: any) => ({
          ...d,
          key: `key-${d.id}`,
          backgroundColor: Colors.WHITE,
          hasLeft: !!renderHiddenItemRight,
          hasRight: !!renderHiddenItemLeft,
        })),
      );
    }, [data]);

    React.useImperativeHandle(ref, () => ({
      closeAll,
    }));

    const closeAll = () => {
      [...itemRefs.current.entries()].forEach(([key, ref]) => {
        ref.close();
      });
    };

    const _renderItem = ({ item, drag }: RenderItemParams<any>) => {
      return (
        <CustomSwipableRowItem
          item={item}
          drag={drag}
          itemRefs={itemRefs}
          numberOfHiddenItem={numberOfHiddenItem}
          renderHiddenItemRight={renderHiddenItemRight}
          renderHiddenItemLeft={renderHiddenItemLeft}
          renderItem={renderItem}
        />
      );
    };

    return (
      <View style={[style, styles.container]}>
        <DraggableFlatList
          activationDistance={15}
          keyExtractor={(item: any) => item.key}
          data={listData}
          renderItem={_renderItem}
          onDragEnd={onDragEnd}
        />
      </View>
    );
  },
);

type Props = {
  data: any[];
  renderItem: any;
  renderHiddenItemLeft?: any;
  renderHiddenItemRight?: any;
  numberOfHiddenItem?: number;
  onDragEnd: any;
  style?: any;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { CustomSortListView };
