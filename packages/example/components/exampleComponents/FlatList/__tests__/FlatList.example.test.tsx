import { render } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import { FlatListExample } from '../FlatList.example';

describe('FlatListExample', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<FlatListExample />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot({
      failureThreshold: 0.15,
      failureThresholdType: 'percent',
    });
  });
});
