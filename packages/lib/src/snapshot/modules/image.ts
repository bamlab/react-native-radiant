import fs from 'fs';
import path from 'path';
import { remoteFallbackImage } from '../../config/configure';
import { logger } from '../../utils/logger';

type ImageSourceProp =
  | {
      source:
        | {
            testUri: string;
          }
        | {
            uri: string;
          };
    }
  | {
      src: string;
    };

type ImageData =
  | {
      type: 'local';
      imagePath: string;
    }
  | {
      type: 'data-uri';
      dataURI: string;
    }
  | {
      type: 'remote';
      url: string;
    }
  | {
      type: null;
    };

const imageToDataURI = (imagePath: string): string => {
  const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
  const fileExtension = imagePath.split('.').pop()?.toLowerCase();

  const mimeType = (() => {
    switch (fileExtension) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'gif':
        return 'image/gif';
      default:
        if (fileExtension === 'undefined') {
          logger.warn('No file extension found');
        } else {
          logger.warn(`Unknown file extension: ${fileExtension}`);
        }
        return '';
    }
  })();

  if (mimeType === '') {
    return '';
  }

  return `data:${mimeType};base64,${imageData}`;
};

// This function is used to resolve the absolute path of an image in the project
// It is used when then image is imported using require
// In the case, Jest resolves the image from the react-native/jest/assetFileTransformer module
// So we need to resolve the absolute path of the image from the assetFileTransformer directory
const resolveImageAbsolutePath = (imageRelativePath: string): string => {
  const reactNativeAssetFileTransformerPath = path.dirname(
    require.resolve('react-native/jest/assetFileTransformer'),
  );
  return path.resolve(reactNativeAssetFileTransformerPath, imageRelativePath);
};

const extractImageData = (imageSource: ImageSourceProp): ImageData => {
  if ('src' in imageSource) {
    // src prop is used => image is remote URL
    return { type: 'remote', url: imageSource.src };
  }

  let imageUri: string;

  if ('uri' in imageSource.source) {
    imageUri = imageSource.source.uri;
  } else if ('testUri' in imageSource.source) {
    // When importing the image using require, jest will replace the image path with a testUri
    imageUri = imageSource.source.testUri;
  } else {
    return { type: null };
  }

  if (imageUri.startsWith('data:')) {
    return { type: 'data-uri', dataURI: imageUri };
  }

  if (imageUri.startsWith('http')) {
    return { type: 'remote', url: imageUri };
  }

  return { type: 'local', imagePath: resolveImageAbsolutePath(imageUri) };
};

const transformImageData = (imageData: ImageData): string | null => {
  switch (imageData.type) {
    case 'local':
      return imageToDataURI(imageData.imagePath);
    case 'data-uri':
      return imageData.dataURI;
    case 'remote':
      if (!remoteFallbackImage) {
        logger.warn(
          'Remote images are not supported in tests: if you need to use a remote image, provide a fallback image using configure function',
        );
      }
      return remoteFallbackImage ? imageToDataURI(remoteFallbackImage) : null;
    case null:
      logger.warn('No image URI found');
      return null;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-case-declarations
      const _exhaustiveCheck: never = imageData;
      return null;
  }
};

const convertImageSource = (imageSource: ImageSourceProp): string => {
  const imageData = extractImageData(imageSource);

  const imageDataURI = transformImageData(imageData);

  return imageDataURI ?? '';
};

export { convertImageSource, ImageSourceProp };
