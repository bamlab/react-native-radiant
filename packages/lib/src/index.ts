import { configure } from './config/configure';
import { generateVisualSnapshotFromHTML } from './snapshot/generateVisualSnapshotFromHTML';
import { generateWebContent } from './snapshot/generateWebContent';
import { RenderResult } from '@testing-library/react-native';

interface GetVisualSnapshotOptions {
  height: number;
  width: number;
}

export const getVisualSnapshot = async (
  renderedComponent: RenderResult,
  options: GetVisualSnapshotOptions = { height: 800, width: 400 },
) => {
  const htmlContent = generateWebContent(renderedComponent);

  return await generateVisualSnapshotFromHTML({
    height: options.height,
    width: options.width,
    htmlContent,
  });
};

export { configure };
