import { CustomRow, CustomIcon } from '@components/atoms';
import React, { useState } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Collapsible from 'react-native-collapsible';

const CustomAccordion = ({
  header,
  headerStyle,
  subHeader,
  arrow = true,
  children,
  onPressCustom,
  arrowIconColor,
}: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  const onPress = () => {
    setCollapsed(!collapsed);
    onPressCustom && onPressCustom();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <CustomRow>
          {header}
          {arrow && (
            <View style={[{ flex: 1, alignItems: 'flex-end' }, headerStyle]}>
              <CustomIcon
                icon={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                color={arrowIconColor || 'primary'}
              />
            </View>
          )}
        </CustomRow>
      </TouchableOpacity>
      {subHeader}
      {/*@ts-ignore*/}
      <Collapsible collapsed={collapsed} align="center">
        {children}
      </Collapsible>
    </>
  );
};

const mStyles = StyleSheet.create({});

type Props = {
  header: any;
  headerStyle?: ViewStyle | TextStyle;
  subHeader?: any;
  children?: React.ReactNode;
  arrow?: boolean;
  onPressCustom?: any;
  arrowIconColor?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
};

export { CustomAccordion };
