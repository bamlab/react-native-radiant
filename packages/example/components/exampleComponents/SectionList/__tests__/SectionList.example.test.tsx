import { render, screen } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import { SectionListExample } from '../SectionList.example';

describe('SectionListExample', () => {
  it('should match image snapshot', async () => {
    render(<SectionListExample />);

    expect(await getVisualSnapshot(screen)).toMatchImageSnapshot({
      failureThreshold: 0.15,
      failureThresholdType: 'percent',
    });
  });
});
