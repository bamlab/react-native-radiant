import { View, StyleSheet } from 'react-native';
import { Entypo, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const ExpoVectorIconsExample = () => {
  return (
    <View style={styles.container}>
      <Entypo name="thumbs-up" size={32} />
      <Feather name="thumbs-up" size={32} />
      <FontAwesome name="thumbs-up" size={32} />
      <Ionicons name="thumbs-up" size={32} />
      <MaterialIcons name="thumb-up" size={32} />
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

export default ExpoVectorIconsExample;
