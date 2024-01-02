import { Colors, Spacing } from '@styles/index';
import { useTheme } from "@utils/themeProvider";
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import SwipeableItem, { OpenDirection, useSwipeableItemParams } from 'react-native-swipeable-item';

const OVERSWIPE_DIST = 50;

export const CustomSwipableRowItem = ({
  item,
  itemRefs,
  drag,
  numberOfHiddenItem,
  renderHiddenItemRight,
  renderHiddenItemLeft,
  renderItem,
}: RowItemProps) => {
  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item.key}
        item={item}
        ref={(ref) => {
          if (ref && !itemRefs.current.get(item.key)) {
            itemRefs.current.set(item.key, ref);
          }
        }}
        onChange={({ openDirection }) => {
          if (openDirection !== OpenDirection.NONE) {
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.key && ref) {
                ref.close();
              }
            });
          }
        }}
        activationThreshold={15}
        swipeDamping={8}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => <UnderlayLeft renderHiddenItemRight={renderHiddenItemRight} />}
        renderUnderlayRight={() => <UnderlayRight renderHiddenItemLeft={renderHiddenItemLeft} />}
        snapPointsLeft={item.hasLeft ? [Spacing.SCALE_60 * numberOfHiddenItem] : undefined}
        snapPointsRight={item.hasRight ? [Spacing.SCALE_60 * numberOfHiddenItem] : undefined}>
        <Overlay renderItem={renderItem} drag={drag} item={item} />
      </SwipeableItem>
    </ScaleDecorator>
  );
};

function Overlay({ renderItem, drag, item }: { renderItem: any; drag: any; item: any }) {
  const { isDark } = useTheme();
  const { openDirection, close, openRight, openLeft } = useSwipeableItemParams();
  const { hasLeft, hasRight } = item as any;
  return (
    <View style={[{ backgroundColor: isDark ? Colors.PRIMARY_DARK : Colors.GRAY_LIGHT }]}>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        {hasRight && <TouchableOpacity onPressOut={(openDirection ? close : openRight) as any} />}
      </View>
      {renderItem({ item, drag })}
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {hasLeft && <TouchableOpacity onPressOut={(openDirection ? close : openLeft) as any} />}
      </View>
    </View>
  );
}

const UnderlayLeft = ({ renderHiddenItemRight }: { renderHiddenItemRight: any }) => {
  const { item, percentOpen, close } = useSwipeableItemParams<any>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen],
  );
  return (
    <Animated.View style={[styles.underlayLeft, animStyle]}>
      {renderHiddenItemRight && renderHiddenItemRight({ item }, close)}
    </Animated.View>
  );
};

function UnderlayRight({ renderHiddenItemLeft }: { renderHiddenItemLeft: any }) {
  const { item, percentOpen, close } = useSwipeableItemParams<any>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen],
  );
  return (
    <Animated.View style={[styles.underlayRight, animStyle]}>
      {renderHiddenItemLeft && renderHiddenItemLeft({ item }, close)}
    </Animated.View>
  );
}

type RowItemProps = {
  item: any;
  drag: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  numberOfHiddenItem: number;
  renderItem: any;
  renderHiddenItemLeft?: any;
  renderHiddenItemRight?: any;
};

const styles = StyleSheet.create({
  underlayRight: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  underlayLeft: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
