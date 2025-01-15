import React from 'react';
import { render } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import ImageExample from '../Image.example';

describe('ImageExample', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<ImageExample />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
