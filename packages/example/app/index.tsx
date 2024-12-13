import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/exampleScreens/Text">
        <Text>Test</Text>
      </Link>
    </View>
  );
};

export default Home;
