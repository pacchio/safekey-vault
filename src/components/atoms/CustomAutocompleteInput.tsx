import { CustomText } from '@components/atoms';
import { CustomListItem } from '@components/molecules';
import { Colors, Spacing, Typography } from '@styles/index';
import React, { useState } from 'react';
import { ImageStyle, Keyboard, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const CustomAutocompleteInput = ({
  style,
  placeholder,
  descriptionKey,
  value,
  itemsToHide,
  data,
  onChangeText,
  onSelectValue,
  returnKeyType,
  onSubmitEditing,
  showListOnFocus = true,
}: Props) => {
  const [showList, setShowList] = useState(false);

  const getData = (listItems: any[]) => {
    if (!showList || !listItems || listItems.length === 0) {
      return [];
    }
    if (!value) {
      return listItems.filter((i) => !itemsToHide?.includes(i.label)).slice(0, 3);
    }
    const newValue = value.replace(/\W/g, '');
    const regex = new RegExp(newValue.trim(), 'i');
    return listItems
      .filter((i) => !itemsToHide?.includes(i.label))
      .filter((d) => d.label.search(regex) >= 0)
      .slice(0, 3);
  };

  const onSelectData = (item: any) => {
    onSelectValue(item);
  };

  const _onChangeText = (v: any) => {
    if (!showList) {
      setShowList(true);
    }
    onChangeText && onChangeText(v);
  };

  const _onFocus = () => {
    showListOnFocus && setShowList(true);
  };

  const _onBlur = () => {
    setShowList(false);
    Keyboard.dismiss();
  };

  return (
    <View style={[mStyle.container, style]}>
      <Autocomplete
        autoCapitalize="none"
        autoCorrect={true}
        flatListProps={{
          keyboardShouldPersistTaps: 'always',
          style: mStyle.flatList,
          keyExtractor: (_item, idx) => (descriptionKey && _item[descriptionKey]) ?? idx,
          renderItem: ({ item, index }) => (
            <CustomListItem onPress={() => onSelectData(item)} key={index} style={mStyle.item}>
              <CustomText>{descriptionKey ? item[descriptionKey] : item}</CustomText>
            </CustomListItem>
          ),
        }}
        style={{
          ...mStyle.input,
          borderBottomRightRadius: getData(data).length > 0 ? 0 : 10,
          borderBottomLeftRadius: getData(data).length > 0 ? 0 : 10,
        }}
        inputContainerStyle={{
          ...mStyle.inputContainer,
          borderBottomRightRadius: getData(data).length > 0 ? 0 : 10,
          borderBottomLeftRadius: getData(data).length > 0 ? 0 : 10,
        }}
        onFocus={_onFocus}
        onBlur={_onBlur}
        containerStyle={mStyle.autocompleteContainer}
        listContainerStyle={mStyle.listContainer}
        placeholder={placeholder}
        placeholderTextColor={Colors.BLACK_SMOKED}
        data={getData(data)}
        defaultValue={value}
        onChangeText={_onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const mStyle = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: Platform.OS === 'android' ? 'row' : 'column',
  },
  autocompleteContainer: {
    flex: 1,
  },
  listContainer: {
    marginLeft: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: Spacing.SCALE_16,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.WHITE,
    position: 'relative',
  },
  flatList: {
    borderWidth: 0,
    marginBottom: 0,
    position: 'relative',
  },
  item: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.GRAY_LIGHT,
    borderColor: Colors.GRAY_LIGHT,
    paddingHorizontal: Spacing.SCALE_16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
  },
  input: {
    backgroundColor: Colors.GRAY_LIGHT,
    paddingHorizontal: Spacing.SCALE_16,
    fontSize: Typography.FONT_SIZE_MEDIUM,
    fontFamily: Typography.FONT_FAMILY_APP,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

type Props = {
  value?: string;
  itemsToHide?: string[];
  data: any[];
  descriptionKey?: string;
  onChangeText?: ((text: string) => void) | undefined;
  onSelectValue: (value: any) => any;
  style?: ViewStyle | TextStyle | ImageStyle;
  inputStyle?: Object;
  placeholder?: string;
  returnKeyType?: 'default' | 'next' | 'go' | 'done';
  onSubmitEditing?: any;
  showListOnFocus?: boolean;
};

export { CustomAutocompleteInput };
