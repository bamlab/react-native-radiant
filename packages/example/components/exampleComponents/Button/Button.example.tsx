import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const ButtonExample = () => {
  return (
    <View style={styles.container}>
      <Button title="Press me" onPress={() => Alert.alert('Simple Button pressed')} />

      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
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

export default ButtonExample;
