import fs from 'fs';
import path from 'path';

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
          console.warn('No file extension found');
        } else {
          console.warn(`Unknown file extension: ${fileExtension}`);
        }
        return '';
    }
  })();

  if (mimeType === '') {
    return '';
  }

  return `data:${mimeType};base64,${imageData}`;
};

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

const transformImageData = (imageData: ImageData): string => {
  switch (imageData.type) {
    case 'local':
      return imageToDataURI(imageData.imagePath);
    case 'data-uri':
      return imageData.dataURI;
    case 'remote':
      console.warn('Remote images are not supported');
      return '';
    case null:
      console.warn('No image URI found');
      return '';
    default:
      const _exhaustiveCheck: never = imageData;
      return '';
  }
};

const convertImageSource = (imageSource: ImageSourceProp): string => {
  const imageData = extractImageData(imageSource);

  const imageDataURI = transformImageData(imageData);

  return imageDataURI;
};

export { convertImageSource, ImageSourceProp };
