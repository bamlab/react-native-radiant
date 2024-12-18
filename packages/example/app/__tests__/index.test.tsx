import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../index';

describe('Home', () => {
  it('should render the Home component correctly', () => {
    const { toJSON } = render(<Home />);
    expect(toJSON()).toMatchSnapshot();
  });
});
