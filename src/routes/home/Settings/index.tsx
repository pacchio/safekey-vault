import { CustomRow, CustomText, CustomView } from '@components/atoms';
import { CustomHeader, CustomListItem } from '@components/molecules';
import { PageContainer } from '@components/organisms';
import { useAppSettings } from '@hooks/useAppSettings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ConfigValue from '@routes/home/Settings/ConfigValue';
import { Spacing } from '@styles/index';
import { FONT_SIZE_SMALL } from '@styles/typography';
import { commonStyles } from '@utils/commonStyles';
import * as _ from 'lodash';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppSetting } from 'types/app-setting';

const SettingsScreen = ({}: NativeStackScreenProps<any>) => {
  const { settings, setSettings } = useAppSettings();

  const _onChange = (config: AppSetting) => {
    if (config) {
      const temp = _.cloneDeep(settings) ?? [];
      const i = temp.findIndex((s) => s.key === config.key);
      if (i > -1) {
        temp[i].value = config.value;
      }
      setSettings(temp);
    }
  };

  return (
    <PageContainer noMargin useScrollView={false} customHeader={<CustomHeader title={'Impostazioni'} />}>
      <CustomView marginTop />
      <ScrollView>
        {settings &&
          settings.map((c) => (
            <CustomListItem key={c.key} noPaddingVertical style={commonStyles.rowContainer}>
              <CustomRow style={{ flex: 1, paddingVertical: Spacing.SCALE_20 }}>
                <View style={{ flex: 5 }}>
                  <CustomText selectable bold>
                    {c.title}
                  </CustomText>
                  {!!c.description && (
                    <CustomRow marginTop>
                      <CustomText size={FONT_SIZE_SMALL}>{c.description}</CustomText>
                    </CustomRow>
                  )}
                </View>
                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                  <ConfigValue appConfig={c} onChange={_onChange} />
                </View>
              </CustomRow>
            </CustomListItem>
          ))}
      </ScrollView>
    </PageContainer>
  );
};

export { SettingsScreen };
