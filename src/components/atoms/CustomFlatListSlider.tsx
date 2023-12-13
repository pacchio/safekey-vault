import { CustomImage, CustomIndicator, CustomText, CustomRow } from '@components/atoms';
import { Colors, Spacing } from '@styles/index';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@styles/mixins';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageStyle,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TextStyle,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';

const CustomFlatListSlider = ({ images, imageIndex, imgStyle, indicator = true, showDescription = true }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const sliderRef = useRef() as any;
  const onViewRef = useRef((viewableItems: any) => {
    if (viewableItems.length > 0) {
      const currentIndex = viewableItems[0].index;
      if (currentIndex % images.length === images.length - 1) {
        setIndex(currentIndex);
        setData([...data, ...images]);
      } else {
        setIndex(currentIndex);
      }
    }
  }) as any;
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    if ((imageIndex || imageIndex === 0) && imageIndex >= 0 && sliderRef?.current) {
      if (imageIndex) {
        setIndex(imageIndex);
      }
      setData(images);
      setTimeout(() => {
        sliderRef.current.scrollToIndex({
          index: imageIndex,
          animated: true,
        });
      }, 100);
    }
  }, [imageIndex, sliderRef, images]);

  const setSelectedIndex = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    if ((selectedIndex || selectedIndex === 0) && selectedIndex >= 0 && sliderRef?.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      sliderRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
      setIndex(selectedIndex);
    }
  };

  return (
    <View>
      <FlatList
        ref={sliderRef}
        horizontal
        pagingEnabled={true}
        snapToInterval={WINDOW_WIDTH}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{}}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={(x: { item: any; index: number }) => (
          <>
            <CustomImage
              animate
              imgStyle={[imgStyle, styles.backgroundImage]}
              resizeMode={'contain'}
              uri={x.item?.url}
            />
            {x.item?.description && showDescription && (
              <CustomRow style={styles.description}>
                <CustomText bold color={'white'}>
                  {x.item?.description}
                </CustomText>
              </CustomRow>
            )}
          </>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
        keyExtractor={(item, i) => item.toString() + i}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        getItemLayout={(d, i) => ({
          length: WINDOW_WIDTH,
          offset: WINDOW_WIDTH * i,
          index: i,
        })}
        onMomentumScrollEnd={setSelectedIndex}
        windowSize={1}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
      />
      {indicator && <CustomIndicator data={images} currentIndex={index % images.length} />}
    </View>
  );
};

type Props = {
  images: any[];
  imageIndex?: number;
  imgStyle?: ImageStyle | ViewStyle | TextStyle;
  showDescription?: boolean;
  animation?: boolean;
  indicator?: boolean;
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  description: {
    paddingHorizontal: Spacing.MARGIN_FROM_BOARD,
    paddingVertical: Spacing.SCALE_12,
    borderBottomWidth: 1,
    borderColor: Colors.WHITE,
    position: 'absolute',
    zIndex: 2,
    bottom: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});

export { CustomFlatListSlider };
