import { Colors } from '@styles/index';
import { useTheme } from '@utils/themeProvider';
import { Switch } from 'react-native';

const CustomSwitch = ({ style, onToggle, value }: Props) => {
  const { isDark } = useTheme();
  return (
    <>
      <Switch
        style={[style]}
        thumbColor={value ? (isDark ? Colors.PRIMARY_DARK : Colors.PRIMARY) : Colors.WHITE_SMOKED}
        trackColor={{
          true: isDark ? Colors.GRAY_DARK : Colors.PRIMARY_TRASPARENT,
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
