export interface AppSetting {
  key: string;
  title: string;
  description?: string;
  value?: string | number | boolean;
  defaultValue: string | number | boolean;
  type: AppSettingType;
}

export type AppSettingType = 'number' | 'string' | 'boolean';
