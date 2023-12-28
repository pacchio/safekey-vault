import { CustomInput, CustomSwitch } from '@components/atoms';
import { SETTINGS_KEYS } from '@constants/index';
import { Theme, useTheme } from '@utils/themeProvider';
import React, { useEffect, useState } from 'react';
import { AppSetting } from 'types/app-setting';

const ConfigValue = ({ appConfig, onChange }: Props) => {
  const [value, setValue] = useState<string | number | boolean>();
  const { setScheme } = useTheme();

  useEffect(() => {
    setValue(appConfig.value ?? appConfig.defaultValue);
  }, [appConfig.value, appConfig.defaultValue]);

  const _onChange = (v: string | number | boolean) => {
    setValue(v);
    onChange({ ...appConfig, value: v });
    if (appConfig.key === SETTINGS_KEYS.DARK_MODE) {
      const theme = v ? Theme.DARK : Theme.LIGTH;
      setScheme(theme);
    }
  };

  return (
    <>
      {appConfig.type === 'boolean' && <CustomSwitch value={value as boolean} onToggle={_onChange} />}
      {appConfig.type === 'string' && <CustomInput value={value as string} onChangeText={_onChange} />}
      {appConfig.type === 'number' && <CustomInput value={value as string} type={'numeric'} onChangeText={_onChange} />}
    </>
  );
};

type Props = {
  appConfig: AppSetting;
  onChange: (appConfig: AppSetting) => void;
};

export default ConfigValue;
