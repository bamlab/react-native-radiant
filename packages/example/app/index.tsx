import { ScrollView } from 'react-native';
import HomeMenuItem from '../components/HomeMenuItem/HomeMenuItem';

const Home = () => {
  return (
    <ScrollView>
      <HomeMenuItem title="Test" link="/exampleScreens/Text" />
      <HomeMenuItem title="Test" link="/exampleScreens/Text" />
      <HomeMenuItem title="Test" link="/exampleScreens/Text" />
    </ScrollView>
  );
};

export default Home;
