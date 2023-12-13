import { darkColors, lightColors } from '@styles/colors';
import { Colors } from '@styles/index';
import * as React from 'react';
import { Switch, useColorScheme } from 'react-native';

export enum Theme {
  LIGTH = 'light',
  DARK = 'dark',
}

export const ThemeContext = React.createContext({
  isDark: false,
  colors: lightColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScheme: (value: Theme) => {},
});

export const ThemeProvider = (props: any) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = React.useState(colorScheme === Theme.DARK);
  // const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // setIsDark(colorScheme === Theme.DARK);
    const init = async () => {
      const theme = Theme.LIGTH;
      // @ts-ignore
      setIsDark(theme === Theme.DARK);
    };
    init();
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: Theme) => setIsDark(scheme === Theme.DARK),
  };

  return <ThemeContext.Provider value={defaultTheme}>{props.children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);

export const ToggleDarkMode = ({ style }: { style?: any }) => {
  const { setScheme, isDark } = useTheme();

  const toggleScheme = () => {
    const theme = isDark ? Theme.LIGTH : Theme.DARK;
    setScheme(theme);
    // setAppTheme(theme);
  };

  return (
    <Switch
      style={[style]}
      thumbColor={isDark ? Colors.PRIMARY : Colors.WHITE_SMOKED}
      trackColor={{ true: Colors.PRIMARY_TRASPARENT, false: Colors.GRAY_MEDIUM }}
      value={isDark}
      onValueChange={toggleScheme}
    />
  );
};
