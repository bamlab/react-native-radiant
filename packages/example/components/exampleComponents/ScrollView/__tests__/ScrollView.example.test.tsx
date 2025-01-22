import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import ScrollViewExample from '../ScrollView.example';

describe('ScrollViewExample', () => {
  it('should match image snapshot', async () => {
    render(<ScrollViewExample />);

    expect(await getVisualSnapshot(screen)).toMatchImageSnapshot();
  });
});
