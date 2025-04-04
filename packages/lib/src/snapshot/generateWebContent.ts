import ReactDOMServer from 'react-dom/server';
import { transformRNToRNWeb } from './transformRNToRNWeb';
import { RenderResult } from '@testing-library/react-native';
import { getFontsHTML } from './modules/fonts';

export const generateWebContent = (renderedComponent: RenderResult) => {
  const pageBody = ReactDOMServer.renderToString(transformRNToRNWeb(renderedComponent.toJSON()));

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pageStyle = require('react-native-web')['StyleSheet'].getSheet().textContent;

  const fontsHTML = getFontsHTML();

  const pageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
        ${fontsHTML}
      <style>
        ${pageStyle}
      </style>
    </head>
    <body style="height: 100vh; display:flex; flex-direction: column;">
      ${pageBody}
    </body>
    </html>
  `;

  return pageContent;
};
