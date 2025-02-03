import { render } from '@testing-library/react-native';
import SVGImage from '../SVGImage.example';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';

describe('SVGImage', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<SVGImage />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
