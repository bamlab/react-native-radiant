import { Image, StyleSheet, Text, View } from 'react-native';

const ImageExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@assets/deer.jpg')} style={styles.image} />
        <Text>Photo by Ash Edmonds on Unsplash</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          src={
            'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=3112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          style={styles.image}
        />
        <Text>Photo by zhengtao tang on Unsplash </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,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',
          }}
          style={styles.image}
        />
        <Text>Photo by Philip Oroni on Unsplash</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '30%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default ImageExample;
