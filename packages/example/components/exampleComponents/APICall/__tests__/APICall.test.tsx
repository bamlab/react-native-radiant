import React, { act } from 'react';
import { render } from '@testing-library/react-native';
import APICall from '../APICall';
import { renderComponentToWebScreenshot } from 'react-native-radiant';
import { createMockServer, expectRequestsToMatchHandlers } from '@matthieug/shm';

interface BoredResponse {
  activity: string;
}

const boredMockServer = createMockServer('https://bored-api.appbrewery.com');

describe('APICall', () => {
  afterEach(expectRequestsToMatchHandlers);
  it('should match image snapshot', async () => {
    boredMockServer.get<BoredResponse>('/random', { activity: 'Test activity' });

    const renderedComponent = render(<APICall />);

    await renderedComponent.findByText('Test activity');

    expect(await renderComponentToWebScreenshot({ renderedComponent })).toMatchImageSnapshot();
  });
});
