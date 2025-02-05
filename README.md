# @bam.tech/react-native-radiant

@bam.tech/react-native-radiant is a React Native library to test your components using visual snapshots of your components.

It is based on [react-native-web](https://github.com/necolas/react-native-web) and [puppeteer](https://github.com/puppeteer/puppeteer).

## Contents

- [Installation](#installation)
- [Example of usage with `jest-image-snapshot`](#example-of-usage-with-jest-image-snapshot)
  - [Threshold](#threshold)
- [Compatibility with other packages](#compatibility-with-other-packages)
  - [Network mocking packages](#network-mocking-packages)
- [License](#license)

# Installation

This package relies on `@testing-library/react-native` and `react-native-web`. You need to install them first:

```bash
yarn add --dev @testing-library/react-native react-native-web react-dom
```

Then you can install `@bam.tech/react-native-radiant`:

```bash
yarn add --dev @bam.tech/react-native-radiant
```

## Example of usage with `jest-image-snapshot`

First, you need to install `jest-image-snapshot` and configure it in your Jest setup files (see the [jest-image-snapshot Github repository](https://github.com/americanexpress/jest-image-snapshot)):

```bash
yarn add --dev jest-image-snapshot @types/jest-image-snapshot
```

To enable jest image snapshot testing, you need to add the following configuration to your Jest setup after env file (or else `expect` will not be defined):

```javascript
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
```

This is what a visual snapshot test looks like:

```javascript
import { render, screen } from '@testing-library/react-native';

it('should match visual snapshot', async () => {
  render(<MyComponent />);

  expect(await getVisualSnapshot(screen)).toMatchImageSnapshot();
});
```

Then run `yarn jest` to generate the snapshots.

The snapshots should be stored in the `__image_snapshots__` folder in your Jest test folder.

### Threshold

You can set a threshold for the visual snapshots using jest-image-snapshot options, in your Jest setup after env file:

```javascript
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });
```

If you need to set a different threshold in different environments (local vs CI for example), you can use environment variables to do so:

```javascript
const snapshotToleranceLevel = process.env.SNAPSHOT_TOLERANCE_LEVEL === 'HIGH' ? 'HIGH' : 'LOW'; // default to low tolerance level

const isSnapshotToleranceLow = snapshotToleranceLevel === 'LOW';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: isSnapshotToleranceLow ? 16 : 0.01,
  failureThresholdType: isSnapshotToleranceLow ? 'pixel' : 'percent',
});

expect.extend({ toMatchImageSnapshot });
```

Then you can run your tests with the `SNAPSHOT_TOLERANCE_LEVEL` environment variable set to `HIGH` or `LOW` to change the threshold:

```bash
SNAPSHOT_TOLERANCE_LEVEL=HIGH yarn jest
```

See [full documentation](https://github.com/americanexpress/jest-image-snapshot) of `jest-image-snapshot` for more details.

## Compatibility with other packages

### Network mocking packages

`react-native-radiant` is based on puppeteer, which uses a headless browser to render the components, and especially network requests.

If you are using a package that intercepts network requests, it may cause `react-native-radiant` screenshot tests to fail.

To fix this, you need to configure the network interceptor in your Jest setup to allow puppeteer requests through. An easy way to do this is to whitelist local requests (e.g. requests which url includes `127.0.0.1`).

Here is an example with `@matthieug/shm`:

```javascript
installInterceptor({
  onUnhandled: (req) => {
    if (req.url.includes('127.0.0.1')) {
      return undefined;
    } else {
      throw new Error(`Unhandled request: ${req.url}`);
    }
  },
});
```

> Warning: this fix requires `@matthieug/shm` version 0.7.3 or higher, for this specific example.

## License

[MIT](./LICENSE)
