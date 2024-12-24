import { globalFonts } from '../configure';
import fs from 'fs';

const convertFontToDataURI = (fontPath: string) => {
  fs.readFileSync(fontPath);

  const base64String = fs.readFileSync(fontPath, 'base64');

  let mimeType: string;
  if (fontPath.endsWith('.ttf')) {
    mimeType = 'font/ttf';
  } else if (fontPath.endsWith('.woff')) {
    mimeType = 'font/woff';
  } else if (fontPath.endsWith('.woff2')) {
    mimeType = 'font/woff2';
  } else if (fontPath.endsWith('.otf')) {
    mimeType = 'font/otf';
  } else if (fontPath.endsWith('.eot')) {
    mimeType = 'application/vnd.ms-fontobject';
  } else if (fontPath.endsWith('.svg')) {
    mimeType = 'image/svg+xml';
  } else {
    mimeType = 'application/octet-stream'; // Default fallback
  }
  const dataURI = `data:${mimeType};base64,${base64String}`;

  return dataURI;
};

export const getFontsHTML = () => {
  return globalFonts
    .map((font) => {
      const dataURI = convertFontToDataURI(font.fontPath);

      return `<style>
                @font-face {
                    font-family: '${font.fontFamily}';
                    src: url('${dataURI}');
                };
            </style>
            `;
    })
    .join('');
};
