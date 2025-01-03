import React from 'react';
import { render } from '@testing-library/react-native';
import RNSafeAreaContextExample from '../RNSafeAreaContext.example';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

describe('RNSafeAreaContext', () => {
  it('should match image snapshot', async () => {
    const renderedComponent = render(
      <SafeAreaProvider>
        <SafeAreaView>
          <RNSafeAreaContextExample />
        </SafeAreaView>
      </SafeAreaProvider>,
    );

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
