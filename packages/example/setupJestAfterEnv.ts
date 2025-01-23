import { expectRequestsToMatchHandlers, installInterceptor, passthrough } from '@matthieug/shm';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

/*
Snapshot tolerance level was introduced to set different tolerance levels between local and CI environments.
This is useful when you want to have a higher tolerance level in CI to avoid flaky tests.
*/

const snapshotToleranceLevel = process.env.SNAPSHOT_TOLERANCE_LEVEL === 'HIGH' ? 'HIGH' : 'LOW'; // default to low tolerance level

const isSnapshotToleranceLow = snapshotToleranceLevel === 'LOW';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: isSnapshotToleranceLow ? 0.005 : 0.06,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

installInterceptor({
  onUnhandled: (req) => {
    if (req.url.includes('127.0.0.1')) {
      return undefined;
    } else {
      throw new Error(`Unhandled request: ${req.url}`);
    }
  },
});

afterEach(expectRequestsToMatchHandlers);
