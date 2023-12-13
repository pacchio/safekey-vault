import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as _ from 'lodash';
import { Colors } from '@styles/index';

const NUMBER_OF_INDICATORS = 10;

const CustomIndicator = ({ data, currentIndex }: Props) => {
  const getIndicators = (): { id: string; active: boolean }[] => {
    if (data && data.length > 0) {
      let indicators = _.cloneDeep(data).map((i) => ({
        id: i?.imageID || '',
        active: false,
      }));
      if (indicators.length > NUMBER_OF_INDICATORS) {
        if (currentIndex > NUMBER_OF_INDICATORS - 2 && currentIndex <= indicators.length - NUMBER_OF_INDICATORS / 2) {
          indicators = indicators.slice(
            currentIndex - NUMBER_OF_INDICATORS / 2,
            currentIndex + NUMBER_OF_INDICATORS / 2,
          );
          indicators[indicators.length - 2].active = true;
        } else if (currentIndex <= NUMBER_OF_INDICATORS - 2) {
          indicators = indicators.slice(0, NUMBER_OF_INDICATORS);
          indicators[currentIndex].active = true;
        } else if (
          currentIndex > indicators.length - NUMBER_OF_INDICATORS / 2 &&
          currentIndex < indicators.length - 1
        ) {
          indicators = indicators.slice(indicators.length - (NUMBER_OF_INDICATORS + 2), indicators.length - 2);
          indicators[indicators.length - 2].active = true;
        } else if (currentIndex === indicators.length - 1) {
          indicators = indicators.slice(indicators.length - (NUMBER_OF_INDICATORS + 1), indicators.length - 1);
          indicators[indicators.length - 1].active = true;
        }
      } else {
        indicators[currentIndex].active = true;
      }
      return indicators;
    }
    return [];
  };

  return (
    <View style={styles.circleDiv}>
      {getIndicators().map((indicator) => (
        <View
          style={[
            styles.whiteCircle,
            {
              backgroundColor: indicator.active ? Colors.PRIMARY : Colors.WHITE,
              width: indicator.active ? 30 : 6,
            },
          ]}
          key={indicator.id}
        />
      ))}
    </View>
  );
};

type Props = {
  data: any[];
  currentIndex: number;
};

const styles = StyleSheet.create({
  circleDiv: {
    position: 'absolute',
    zIndex: 2,
    bottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 4,
    backgroundColor: Colors.WHITE,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});

export { CustomIndicator };
