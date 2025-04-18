import { configure } from '@bam.tech/react-native-radiant';
import svgMapper from '@bam.tech/react-native-radiant-svg';

jest.mock('expo-font', () => {
  const module: typeof import('expo-font') = {
    ...jest.requireActual('expo-font'),
    isLoaded: jest.fn(() => true),
  };

  return module;
});

configure({
  fonts: [
    {
      fontFamily: 'Entypo',
      fontPath:
        '../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf',
    },
    {
      fontFamily: 'Feather',
      fontPath:
        '../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf',
    },
    {
      fontFamily: 'FontAwesome',
      fontPath:
        '../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf',
    },
    {
      fontFamily: 'Ionicons',
      fontPath:
        '../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf',
    },
    {
      fontFamily: 'material',
      fontPath:
        '../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf',
    },
  ],
  defaultFallbackImage: './assets/default.jpg',
  additionalMappers: [svgMapper],
});
