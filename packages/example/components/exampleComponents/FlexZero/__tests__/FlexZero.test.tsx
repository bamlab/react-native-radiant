import { render, screen } from '@testing-library/react-native';
import FlexZero from '../FlexZero';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';

describe('FlexZero', () => {
  it('should match image snapshot', async () => {
    render(<FlexZero />);

    expect(await getVisualSnapshot(screen)).toMatchImageSnapshot();
  });
});
