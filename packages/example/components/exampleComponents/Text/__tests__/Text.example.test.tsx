import React from 'react';
import { render } from '@testing-library/react-native';
import TextExample from '../Text.example';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import { expectRequestsToMatchHandlers } from '@matthieug/shm';

describe('TextExample', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<TextExample />);

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
