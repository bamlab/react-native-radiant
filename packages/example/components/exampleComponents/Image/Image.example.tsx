import { Image, StyleSheet, Text, View } from 'react-native';

const ImageExample = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@assets/deer.jpg')} style={styles.image} />
      <Text>Photo by Ash Edmonds on Unsplash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default ImageExample;
