import { SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          title: 'Home',
        }}
      />
    </SafeAreaView>
  );
}
