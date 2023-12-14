import { CustomText, CustomLabelText } from '@components/atoms';
import { CustomListItem } from '@components/molecules/CustomListItem';
import { FONT_SIZE_SMALL } from '@styles/typography';
import { commonStyles } from '@utils/commonStyles';
import React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

const CustomMenuItem = ({
  style,
  onPress,
  icon,
  iconFontawesome,
  title,
  description,
  descriptionColor,
  disabled,
}: Props) => {
  return (
    <>
      <CustomListItem
        style={{ ...commonStyles.menuItem, ...style }}
        onPress={onPress}
        arrow={!!onPress}
        disabled={disabled}>
        <CustomLabelText
          style={{ flex: 4 }}
          noWrap
          marginVertical
          icon={icon}
          iconFontawesome={iconFontawesome}
          disabled={disabled}
          element={
            <>
              <CustomText color={disabled ? 'gray' : 'black'}>{title}</CustomText>
              {!!description && (
                <CustomText size={FONT_SIZE_SMALL} color={descriptionColor}>
                  {description}
                </CustomText>
              )}
            </>
          }
        />
      </CustomListItem>
    </>
  );
};

type Props = {
  children?: any;
  style?: ViewStyle | ImageStyle | TextStyle | any[];
  onPress?: any;
  icon?: string;
  iconFontawesome?: string;
  title?: string;
  description?: string;
  descriptionColor?: 'primary' | 'secondary' | 'accent' | 'gray' | 'white' | 'black' | string;
  disabled?: boolean;
};

export default CustomMenuItem;
