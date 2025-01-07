import React from 'react';
import { render } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import ExpoVectorIconsExample from '../ExpoVectorIcons';

describe('ExpoVectorIcons', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<ExpoVectorIconsExample />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
