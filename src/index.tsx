import 'react-native-reanimated';
import { toastConfig } from '@components/atoms/CustomToast';
import { useInitialConfig } from '@hooks/useInitialConfig';
import { Navigator } from '@navigation/index';
import { store } from '@store/index';
import { ThemeProvider } from '@utils/themeProvider';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const AppContent = (props: any) => {
  const initCompleted = useInitialConfig();
  return (
    <DismissKeyboard>
      <>
        <Navigator {...props} initCompleted={initCompleted} />
        <Toast config={toastConfig} />
      </>
    </DismissKeyboard>
  );
};

const App = (props: any) => (
  <Provider store={store}>
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent {...props} />
      </SafeAreaProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
