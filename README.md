# @bam.tech/react-native-radiant

@bam.tech/react-native-radiant is a React Native library to test your components using visual snapshots of your components.

It is based on react-native-web and puppeteer.

## Installation

```bash
yarn add --dev @bam.tech/react-native-radiant
```

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

## Usage

This is what a ray (a visual snapshot of a component) test looks like:

```javascript
it('should match ray snapshot', async () => {
  const renderedComponent = render(<MyComponent />);

  const ray = await renderComponentToWebScreenshot({ renderedComponent });

  expect(ray).toMatchImageSnapshot();
});
```

Then run `yarn jest` to generate the snapshots.

The snapshots should be stored in the `__image_snapshots__` folder in your Jest test folder.

## License

[MIT](./LICENSE)
