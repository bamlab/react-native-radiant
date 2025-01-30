import { render } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import ButtonExample from '../Button.example';

describe('ButtonExample', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<ButtonExample />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
