import { installInterceptor, passthrough } from '@matthieug/shm';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

/*
Snapshot tolerance level was introduced to set different tolerance levels between local and CI environments.
This is useful when you want to have a higher tolerance level in CI to avoid flaky tests.
*/

const snapshotToleranceLevel = process.env.SNAPSHOT_TOLERANCE_LEVEL === 'HIGH' ? 'HIGH' : 'LOW'; // default to low tolerance level

const isSnapshotToleranceLow = snapshotToleranceLevel === 'LOW';

const toMatchImageSnapshot = configureToMatchImageSnapshot(
  isSnapshotToleranceLow
    ? {
        failureThreshold: 0.005,
        failureThresholdType: 'percent',
      }
    : {
        failureThreshold: 0.06,
        failureThresholdType: 'percent',
      },
);
installInterceptor();
expect.extend({ toMatchImageSnapshot });
