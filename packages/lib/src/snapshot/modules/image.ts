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

const convertImageSource = (imageSource: ImageSourceProp): string => {
  if ('src' in imageSource) {
    // src prop is used => image is remote URL
    console.warn('Remote images are not supported');
    return '';
  }

  let imageUri: string;

  if ('uri' in imageSource.source) {
    imageUri = imageSource.source.uri;
  } else if ('testUri' in imageSource.source) {
    imageUri = imageSource.source.testUri;
  } else {
    console.warn('No image URI found');
    return '';
  }

  if (imageUri.startsWith('data:')) {
    return imageUri;
  }

  if (imageUri.startsWith('http')) {
    console.warn('Remote images are not supported');
    return '';
  }

  const imageRelativePath: string = imageUri;

  const reactNativeAssetFileTransformerPath = path.dirname(
    require.resolve('react-native/jest/assetFileTransformer'),
  );

  const imagePath = path.resolve(reactNativeAssetFileTransformerPath, imageRelativePath);

  const imageAsDataURI = imageToDataURI(imagePath);

  return imageAsDataURI;
};

export { convertImageSource, imageToDataURI, ImageSourceProp };
