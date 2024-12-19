import { StyleSheet, Text, View } from 'react-native';

const TextExample = () => {
  return (
    <View style={styles.container}>
      <Text>This is a text</Text>
      <Text>This is another text</Text>
      <Text>This is the last text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default TextExample;
