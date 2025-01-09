import fs from 'fs';
import path from 'path';

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

const convertImageSource = (imageUri: string): string => {
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

export { convertImageSource, imageToDataURI };
