import { CustomLoader } from '@components/molecules/CustomLoader';
import { RootState } from '@store/index';
import { Colors, Spacing } from '@styles/index';
import { WINDOW_HEIGHT } from '@styles/mixins';
import { wait } from '@utils/commonFunctions';
import { commonStyles } from '@utils/commonStyles';
import { useTheme } from '@utils/themeProvider';
import React, { useCallback } from 'react';
import {
  ImageBackground,
  ImageStyle,
  KeyboardAvoidingView,
  LogBox,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

const SafeAreaContainer = ({ children, barStyle }: { children: any; barStyle?: StatusBarStyle }) => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: barStyle && barStyle === 'light-content' ? Colors.BLACK : Colors.WHITE,
    }}>
    <StatusBar barStyle={barStyle || (Platform.OS === 'ios' ? 'dark-content' : 'default')} />
    {children}
  </SafeAreaView>
);

const PageContainer = ({
  children,
  absoluteElementTop,
  absoluteElementBottom,
  backgroundImage,
  whiteBackgroundLoader,
  containerStyle,
  subContainerStyle,
  scrollviewContentStyle,
  customHeaderStyle,
  customHeader,
  noMargin = false,
  centerContent = false,
  onRefresh,
  onScroll,
  useScrollView = true,
  useSafeArea = false,
  barStyle,
  useKeyboardAvoidingView = true,
}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const isLoading = useSelector((state: RootState) => state.common.isLoading);
  const { colors } = useTheme();

  const mContainerStyle = {
    ...styles.container,
    backgroundColor: colors.backgroundPage,
  };
  const mHeaderStyle = {
    ...styles.header,
    backgroundColor: colors.backgroundHeader,
  };
  let mSubContainerStyle: any = { ...styles.subContainer };
  mSubContainerStyle = centerContent ? { ...mSubContainerStyle, justifyContent: 'center' } : { ...mSubContainerStyle };
  mSubContainerStyle = noMargin
    ? {
        ...mSubContainerStyle,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
      }
    : { ...mSubContainerStyle };

  const onRefreshCustom = useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => {
      onRefresh();
      setRefreshing(false);
    });
  }, [onRefresh]);

  const mainContent = <View style={[mSubContainerStyle, subContainerStyle]}>{children}</View>;

  const scrollableContent = (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={onRefresh && <RefreshControl refreshing={refreshing} onRefresh={onRefreshCustom} />}
        bounces={!!onRefresh}
        onScroll={onScroll}
        scrollEventThrottle={1}
        contentContainerStyle={
          centerContent
            ? [styles.scrollviewContentCenter, scrollviewContentStyle]
            : [styles.scrollviewContent, scrollviewContentStyle]
        }
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled">
        {mainContent}
      </ScrollView>
    </SafeAreaView>
  );

  const pageContent = (
    <>
      {absoluteElementTop}
      {useScrollView ? scrollableContent : mainContent}
      {absoluteElementBottom}
      {isLoading ? <CustomLoader whiteBackground={whiteBackgroundLoader} /> : <></>}
    </>
  );

  const content = (
    <View style={[mContainerStyle, containerStyle]}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? barStyle || 'dark-content' : 'default'}
        backgroundColor={Colors.PRIMARY}
      />
      {customHeader && (
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={{ ...mHeaderStyle, ...customHeaderStyle }}>{customHeader}</View>
        </SafeAreaView>
      )}
      <ImageBackground source={backgroundImage} style={styles.image} resizeMode={'stretch'} resizeMethod={'auto'}>
        {useKeyboardAvoidingView ? (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            {pageContent}
          </KeyboardAvoidingView>
        ) : (
          pageContent
        )}
      </ImageBackground>
    </View>
  );

  return <>{useSafeArea ? <SafeAreaContainer barStyle={barStyle}>{content}</SafeAreaContainer> : content}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerSafeArea: {
    ...commonStyles.headerStyle,
    backgroundColor: Colors.WHITE,
  },
  header: {
    height: Platform.OS === 'ios' ? 44 : 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingRight: 16,
    paddingLeft: 8,
  },
  image: {
    flex: 1,
    height: WINDOW_HEIGHT,
  },
  scrollviewContentCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollviewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  subContainer: {
    marginLeft: Spacing.MARGIN_FROM_BOARD,
    marginRight: Spacing.MARGIN_FROM_BOARD,
    marginBottom: Spacing.SCALE_20,
    marginTop: Spacing.SCALE_20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

type Props = {
  children?: any;
  absoluteElementTop?: any;
  absoluteElementBottom?: any;
  backgroundImage?: any;
  isLoading?: boolean;
  whiteBackgroundLoader?: boolean;
  customHeader?: any;
  customHeaderStyle?: ViewStyle | TextStyle | ImageStyle | any[];
  subContainerStyle?: ViewStyle | TextStyle | ImageStyle | any[];
  scrollviewContentStyle?: ViewStyle | TextStyle | ImageStyle;
  containerStyle?: ViewStyle | TextStyle | ImageStyle;
  noMargin?: boolean;
  centerContent?: boolean;
  onRefresh?: any;
  onScroll?: any;
  useScrollView?: boolean;
  useSafeArea?: boolean;
  barStyle?: StatusBarStyle;
  useKeyboardAvoidingView?: boolean;
};

export { PageContainer };
