import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ScrollViewExample = () => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {Array.from({ length: 100 }).map((_, index) => (
        <Text key={index}>This is item {index}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: { alignItems: 'center' },
});

export default ScrollViewExample;
