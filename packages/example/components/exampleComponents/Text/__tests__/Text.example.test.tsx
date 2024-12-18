import React from 'react';
import { render } from '@testing-library/react-native';
import TextExample from '../Text.example';
import { renderComponentToWebScreenshot } from 'kin';

describe('TextExample', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(<TextExample />);

    expect(await renderComponentToWebScreenshot({ renderedComponent })).toMatchImageSnapshot();
  });
});
