import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
