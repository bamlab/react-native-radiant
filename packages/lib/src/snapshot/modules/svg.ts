import { ReactTestRendererJSON } from 'react-test-renderer';
import { convertInt32ColorToRGBA } from 'react-native-svg/src/web/utils/convertInt32Color';
import { camelCaseToDashed } from 'react-native-svg/src/web/utils/index';

const svgElementsMap: Record<string, string> = {
  RNSVGSvgView: 'svg',
  RNSVGCircle: 'circle',
  RNSVGEllipse: 'ellipse',
  RNSVGLine: 'line',
  RNSVGPath: 'path',
  Polygon: 'polygon',
  Polyline: 'polyline',
  RNSVGRect: 'rect',
  RNSVGText: 'text',
  RNSVGGroup: 'g',
  RNSVGDefs: 'defs',
  RNSVGUse: 'use',
  RNSVGSymbol: 'symbol',
  RNSVGLinearGradient: 'linearGradient',
  RNSVGRadialGradient: 'radialGradient',
  Stop: 'stop',
  RNSVGClipPath: 'clipPath',
  RNSVGMask: 'mask',
  RNSVGPattern: 'pattern',
  RNSVGImage: 'image',
  RNSVGTSpan: 'tspan',
  RNSVGTextPath: 'textPath',
  RNSVGForeignObject: 'foreignObject',
  RNSVGFeColorMatrix: 'feColorMatrix',
  RNSVGFeComposite: 'feComposite',
  RNSVGFeGaussianBlur: 'feGaussianBlur',
  RNSVGFeMerge: 'feMerge',
  RNSVGFeOffset: 'feOffset',
  RNSVGFilter: 'filter',
  RNSVGMarker: 'marker',
  RNSVGSvgAndroid: 'svg',
  RNSVGSvgIOS: 'svg',
};

export const isElementSVG = (nodeType: string) => nodeType in svgElementsMap;

export const convertSVGTypeToHTML = (nodeType: string) => svgElementsMap[nodeType];

// Fix props for converting to HTML
export const convertSVGProps = (node: ReactTestRendererJSON) => {
  const { props } = node;

  const newProps = { ...props };

  // merge styles array as one object
  if (Array.isArray(newProps.style)) {
    newProps.style = Object.assign({}, ...newProps.style);
  }

  if (newProps.fill && typeof newProps.fill === 'object') {
    const fillValue = newProps.fill as { payload: number };
    newProps.fill = convertInt32ColorToRGBA(fillValue.payload);
  }

  if (newProps.stroke && typeof newProps.stroke === 'object') {
    const strokeValue = newProps.stroke as { payload: number };
    newProps.stroke = convertInt32ColorToRGBA(strokeValue.payload);
  }

  // convert every prop from camelCase to dashed
  Object.keys(newProps).forEach((key) => {
    const newKey = camelCaseToDashed(key);
    if (newKey !== key) {
      newProps[newKey] = newProps[key];
      delete newProps[key];
    }
  });

  return newProps;
};
