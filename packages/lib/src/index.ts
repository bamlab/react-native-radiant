import { configure } from './config/configure';
import { generateVisualSnapshotFromHTML } from './snapshot/generateVisualSnapshotFromHTML';
import { generateWebContent } from './snapshot/generateWebContent';
import { RenderResult } from '@testing-library/react-native';
import { overrideConsoleIfNeeded, restoreConsole } from './utils/overrideConsole';

interface GetVisualSnapshotOptions {
  height: number;
  width: number;
}

export const getVisualSnapshot = async (
  renderedComponent: RenderResult,
  options: GetVisualSnapshotOptions = { height: 800, width: 400 },
) => {
  try {
    initialize();

    const htmlContent = generateWebContent(renderedComponent);

    return await generateVisualSnapshotFromHTML({
      height: options.height,
      width: options.width,
      htmlContent,
    });
  } catch (error) {
    dispose();
    throw error;
  } finally {
    dispose();
  }
};

export { configure };

const initialize = () => {
  overrideConsoleIfNeeded();
};

const dispose = () => {
  restoreConsole();
};
