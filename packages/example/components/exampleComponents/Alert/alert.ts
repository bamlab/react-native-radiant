// source : https://github.com/necolas/react-native-web/issues/1026#issuecomment-679102691

import { Alert, Platform, AlertButton, AlertOptions } from 'react-native';

const alertPolyfill = (
  title: string,
  description?: string,
  options?: AlertButton[],
  extra?: AlertOptions,
): void => {
  const result = window.confirm([title, description].filter(Boolean).join('\n'));

  if (result) {
    const confirmOption = options?.find(({ style }) => style !== 'cancel');
    confirmOption?.onPress?.();
  } else {
    const cancelOption = options?.find(({ style }) => style === 'cancel');
    cancelOption?.onPress?.();
  }
};

const alert: typeof Alert.alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert;

export default alert;
