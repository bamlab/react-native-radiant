import { View } from 'react-native';

const FlexZero = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
      <View style={{ flex: 0, height: 50, backgroundColor: 'orange' }} />
      <View style={{ flex: 1, backgroundColor: 'green' }} />
    </View>
  );
};

export default FlexZero;
