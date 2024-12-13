import { SafeAreaView, Text } from 'react-native';
import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack />
    </SafeAreaView>
  );
}
