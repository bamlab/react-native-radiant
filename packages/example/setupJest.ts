import { configure } from '@bam.tech/react-native-radiant';

jest.mock('expo-font', () => {
  const module: typeof import('expo-font') = {
    ...jest.requireActual('expo-font'),
    isLoaded: jest.fn(() => true),
  };

  return module;
});

configure({ fonts: [] });
