//github.com/software-mansion/react-native-svg/blob/e79a6c198e528c77b015325592861ac7d5b32b5f/src/web/utils/convertInt32Color.ts
export function convertInt32ColorToRGBA(color: number) {
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;
  const a = ((color >> 24) & 255) / 255;
  const alpha = a.toFixed(2);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Source: https://github.com/software-mansion/react-native-svg/blob/e79a6c198e528c77b015325592861ac7d5b32b5f/src/web/utils/index.ts#L11
export const camelCaseToDashed = (camelCase: string) => {
  return camelCase.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
};
