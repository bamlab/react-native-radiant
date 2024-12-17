import { Pressable, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

interface HomeMenuItemProps {
  title: string;
  link: string;
}

const HomeMenuItem = ({ title, link }: HomeMenuItemProps) => {
  const router = useRouter();

  const onPress = () => {
    router.navigate(link);
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,

    borderColor: '#00000033',
    borderBottomWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
});

export default HomeMenuItem;
