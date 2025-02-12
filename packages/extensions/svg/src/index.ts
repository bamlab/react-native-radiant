import { ReactTestRendererJSON } from 'react-test-renderer';
import { convertInt32ColorToRGBA, camelCaseToDashed } from './utils';
import { Mapper } from '@bam.tech/react-native-radiant/src/config/configure';
import { StyleSheet } from 'react-native';

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

const convertSVGTypeToHTML = (nodeType: string) => svgElementsMap[nodeType];

// Fix props for converting to HTML
// This is required because the received props are made for React Native
// and fill/stroke are objects (this is the behavior of react-native-svg)
const convertSVGProps = (props: Record<string, unknown>) => {
  const newProps = Object.entries(props).reduce((acc, [key, value]) => {
    const newKey = camelCaseToDashed(key);
    acc[newKey] = value;
    return acc;
  }, {} as Record<string, unknown>);

  // merge styles array as one object

  newProps.style = StyleSheet.flatten(newProps.style);

  if (newProps.fill && typeof newProps.fill === 'object') {
    const fillValue = newProps.fill as { payload: number };
    newProps.fill = convertInt32ColorToRGBA(fillValue.payload);
  }

  if (newProps.stroke && typeof newProps.stroke === 'object') {
    const strokeValue = newProps.stroke as { payload: number };
    newProps.stroke = convertInt32ColorToRGBA(strokeValue.payload);
  }

  return newProps;
};

const inputElement = Object.keys(svgElementsMap);

const outputElement = (node: ReactTestRendererJSON) => {
  const newType = convertSVGTypeToHTML(node.type);

  const newProps = convertSVGProps(node.props);

  return { type: newType, props: newProps };
};

export default { inputElement, outputElement } satisfies Mapper;
