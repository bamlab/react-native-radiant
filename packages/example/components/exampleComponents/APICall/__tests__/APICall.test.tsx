import { render } from '@testing-library/react-native';
import APICall from '../APICall';
import { getVisualSnapshot } from '@bam.tech/react-native-radiant';
import { createMockServer } from '@matthieug/shm';

interface BoredResponse {
  activity: string;
}

const boredMockServer = createMockServer('https://bored-api.appbrewery.com');

describe('APICall', () => {
  it('should match image snapshot', async () => {
    boredMockServer.get<BoredResponse>('/random', { activity: 'Test activity' });

    const renderedComponent = render(<APICall />);

    await renderedComponent.findByText('Test activity');

    expect(await getVisualSnapshot(renderedComponent)).toMatchImageSnapshot();
  });
});
