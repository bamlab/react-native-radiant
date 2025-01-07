import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 16,
  failureThresholdType: 'pixel',
});

expect.extend({ toMatchImageSnapshot });
