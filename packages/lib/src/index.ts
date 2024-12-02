import { configure, globalFonts } from './config/configure';
import { generateVisualSnapshot } from './generateVisualSnapshot';
import { generateWebContent } from './generateWebContent';
import { RenderResult } from '@testing-library/react-native';

interface RenderComponentToWebScreenshotParams {
  renderedComponent: RenderResult;
  height?: number;
  width?: number;
}

export const renderComponentToWebScreenshot = async ({
  renderedComponent,
  height = 800,
  width = 400,
}: RenderComponentToWebScreenshotParams) => {
  const pageContent = generateWebContent(renderedComponent);

  return await generateVisualSnapshot({
    height: height,
    width: width,
    pageContent,
  });
};

export { configure, globalFonts };
