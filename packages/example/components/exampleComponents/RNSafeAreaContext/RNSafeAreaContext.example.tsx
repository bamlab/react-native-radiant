import { Text } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const RNSafeAreaContextExample = () => {
  return (
    <SafeAreaProvider>
      <Text>This is a text</Text>
      <Text>This is another text</Text>
      <Text>This is the last text</Text>
    </SafeAreaProvider>
  );
};

export default RNSafeAreaContextExample;
