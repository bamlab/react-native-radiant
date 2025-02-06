import { render, screen } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import ActivityIndicatorExample from '../ActivityIndicator.example';

describe('ActivityIndicatorExample', () => {
  it('should match image snapshot', async () => {
    render(<ActivityIndicatorExample />);

    expect(await getVisualSnapshot(screen)).toMatchImageSnapshot();
  });
});
