import { ScrollView, StyleSheet, Text } from 'react-native';

export const ScrollViewExample = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Array.from({ length: 100 }).map((_, index) => (
        <Text key={index}>This is item {index}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
});
