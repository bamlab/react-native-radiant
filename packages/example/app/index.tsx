import { ScrollView } from 'react-native';
import HomeMenuItem from '@components/HomeMenuItem/HomeMenuItem';

const Home = () => {
  return (
    <ScrollView>
      <HomeMenuItem title="Text" link="/exampleScreens/Text" />
      <HomeMenuItem title="RNSafeAreaContext" link="/exampleScreens/RNSafeAreaContext" />
      <HomeMenuItem title="Button" link="/exampleScreens/Button" />
      <HomeMenuItem title="TextInput" link="/exampleScreens/TextInput" />
      <HomeMenuItem title="Expo Vector Icons" link="/exampleScreens/ExpoVectorIcons" />
      <HomeMenuItem title="Image" link="/exampleScreens/Image" />
      <HomeMenuItem title="Alert" link="/exampleScreens/Alert" />
    </ScrollView>
  );
};

export default Home;
