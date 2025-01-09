import fs from 'fs';

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

export { imageToDataURI };
