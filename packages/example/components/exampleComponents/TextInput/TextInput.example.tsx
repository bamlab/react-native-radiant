import { StyleSheet, TextInput, View } from 'react-native';

const TextInputExample = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={'This is a test'} />
      <TextInput style={styles.input} placeholder="useless placeholder" keyboardType="numeric" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TextInputExample;
