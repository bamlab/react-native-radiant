import fs from 'fs';

const imageToDataURI = (imagePath: string): string => {
  const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
  const ext = imagePath.split('.').pop()?.toLowerCase() || 'png';
  const mimeType =
    ext === 'png'
      ? 'image/png'
      : ext === 'jpg' || ext === 'jpeg'
      ? 'image/jpeg'
      : ext === 'gif'
      ? 'image/gif'
      : 'application/octet-stream';

  return `data:${mimeType};base64,${imageData}`;
};

export { imageToDataURI };
