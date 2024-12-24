# @bam.tech/react-native-radiant

@bam.tech/react-native-radiant is a React Native library to test your components using visual snapshots of your components.

It is based on [react-native-web](https://github.com/necolas/react-native-web) and [puppeteer](https://github.com/puppeteer/puppeteer).

## Installation

This package relies on `@testing-library/react-native` and `react-native-web`. You need to install them first:

```bash
yarn add --dev @testing-library/react-native react-native-web
```

Then you can install `@bam.tech/react-native-radiant`:

````

```bash
yarn add --dev @bam.tech/react-native-radiant
````

## Setup

First, you need to install `jest-image-snapshot` and configure it in your Jest setup files (see the [jest-image-snapshot Github repository](https://github.com/americanexpress/jest-image-snapshot)):

```bash
yarn add --dev jest-image-snapshot
```

Add the following configuration to your Jest setup file to setup @bam.tech/react-native-radiant:

```javascript
// setupJest.ts
import { configure } from 'react-native-radiant';

configure({
  // Add your configuration here
  fonts: [
    // List of fonts to load
    {
      fontFamily: 'Nunito-Black',
      fontPath: './assets/fonts/Nunito-Black.ttf',
    },
  ],
});
```

## Example of usage with `jest-image-snapshot`

This is what a visual snapshot test looks like:

```javascript
it('should match visual snapshot', async () => {
  const renderedComponent = render(<MyComponent />);

  const visualSnapshot = await getVisualSnapshot(renderedComponent);

  expect(visualSnapshot).toMatchImageSnapshot();
});
```

Then run `yarn jest` to generate the snapshots.

The snapshots should be stored in the `__image_snapshots__` folder in your Jest test folder.

## License

[MIT](./LICENSE)
