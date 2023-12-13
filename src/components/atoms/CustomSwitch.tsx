import { Colors } from '@styles/index';
import React from 'react';
import { Switch } from 'react-native';

const CustomSwitch = ({ style, onToggle, value }: Props) => {
  return (
    <>
      <Switch
        style={[style]}
        thumbColor={value ? Colors.PRIMARY : Colors.WHITE_SMOKED}
        trackColor={{
          true: Colors.PRIMARY_TRASPARENT,
          false: Colors.GRAY_MEDIUM,
        }}
        value={value}
        onValueChange={onToggle}
      />
    </>
  );
};

type Props = {
  value: boolean;
  onToggle?: (value: boolean) => void;
  style?: any;
};

export { CustomSwitch };
