import { CustomRow, CustomChip } from '@components/atoms';
import { Spacing } from '@styles/index';
import React from 'react';
import { ImageStyle, ScrollView, StyleSheet, ViewStyle } from 'react-native';

const ChipList = ({ data, onClose, style, horizontal = true, color, disabled }: Props) => {
  return (
    <>
      {data.length > 0 && (
        <ScrollView
          style={[style]}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: horizontal ? 'center' : 'flex-start',
          }}
          horizontal={horizontal}>
          <CustomRow>
            {data.map((f, i) => (
              <CustomChip
                disabled={disabled}
                key={i}
                text={f.label}
                style={styles.chip}
                color={color}
                onClose={onClose ? () => onClose(f) : undefined}
              />
            ))}
          </CustomRow>
        </ScrollView>
      )}
    </>
  );
};

type Props = {
  data: { label: string; value?: string }[];
  onClose?: (item: { label: string; value?: string }) => void;
  horizontal?: boolean;
  style?: ViewStyle | ImageStyle;
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  disabled?: boolean;
};

const styles = StyleSheet.create({
  chip: {
    marginRight: Spacing.SCALE_8,
    marginTop: Spacing.SCALE_6,
    marginBottom: Spacing.SCALE_6,
  },
});

export { ChipList };
