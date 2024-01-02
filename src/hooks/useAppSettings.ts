import { SETTINGS } from '@constants/index';
import { KEYS, useAppStorage } from '@hooks/useStorage';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { AppSetting } from 'types/app-setting';

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSetting[]>();
  const [settingsStored, setSettingsStored] = useAppStorage(KEYS.SETTINGS);

  useEffect(() => {
    if (settingsStored) {
      const _settings: AppSetting[] = JSON.parse(settingsStored as string);
      const merge = SETTINGS.map((setting) =>
        _.merge(
          _settings.find((st) => st.key === setting.key),
          setting,
        ),
      );
      setSettings(merge);
    } else {
      setSettings(SETTINGS);
    }
  }, [settingsStored]);

  const updateSettings = (_settings: AppSetting[]) => {
    setSettingsStored(JSON.stringify(_settings));
    setSettings(_settings);
  };

  const getSetting = (key: string) => {
    return settings?.find((s) => s.key === key)?.value;
  };

  return { settings, setSettings: updateSettings, getSetting };
};
