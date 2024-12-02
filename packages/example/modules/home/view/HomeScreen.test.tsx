import { render, screen } from '@testing-library/react-native';
import { HomeScreen } from './HomeScreen';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import * as Kin from 'kin';

test('HomeScreen', async () => {
  render(<HomeScreen />);

  expect(
    await Kin.renderComponentToWebScreenshot({
      renderedComponent: screen,
    }),
  ).toMatchImageSnapshot();
});
