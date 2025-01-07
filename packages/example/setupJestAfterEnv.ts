import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const snapshotToleranceLevel = process.env.SNAPSHOT_TOLERANCE_LEVEL === 'HIGH' ? 'HIGH' : 'LOW'; // default to low tolerance level

const isSnapshotToleranceLow = snapshotToleranceLevel === 'LOW';

const toMatchImageSnapshot = configureToMatchImageSnapshot(
  isSnapshotToleranceLow
    ? {
        failureThreshold: 16,
        failureThresholdType: 'pixel',
      }
    : {
        failureThreshold: 0.01,
        failureThresholdType: 'percent',
      },
);

expect.extend({ toMatchImageSnapshot });
