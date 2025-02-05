import { ReactTestRendererJSON } from 'react-test-renderer';

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
};

export const isElementSVG = (nodeType: string) => nodeType in svgElementsMap;

export const convertSVGTypeToHTML = (nodeType: string) => svgElementsMap[nodeType];

const convertFill = (fill: { type: number; payload: number }): string => {
  // Optionally, handle different fill types
  if (fill.type !== 0) {
    throw new Error('Unsupported fill type');
  }

  // Extract ARGB components from the 32-bit integer
  const argb = fill.payload;
  const alpha = (argb >>> 24) & 0xff; // most significant byte
  const red = (argb >>> 16) & 0xff;
  const green = (argb >>> 8) & 0xff;
  const blue = argb & 0xff;

  // Convert alpha from 0–255 to 0–1
  const alphaNormalized = alpha / 255;

  // OPTIONAL: If you prefer returning RGBA for all cases:
  // return `rgba(${red}, ${green}, ${blue}, ${alphaNormalized.toFixed(2)})`;

  // Otherwise, return hex if fully opaque
  if (alpha === 255) {
    // Return standard hex format
    return `#${[red, green, blue].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
  }

  // Return RGBA if partially transparent
  return `rgba(${red}, ${green}, ${blue}, ${alphaNormalized.toFixed(2)})`;
};

export const convertSVGProps = (node: ReactTestRendererJSON) => {
  const { props } = node;

  const newProps = { ...props };

  // merge styles array as one object
  if (Array.isArray(newProps.style)) {
    newProps.style = Object.assign({}, ...newProps.style);
  }

  // remove flex: 0 from style
  if (newProps.style?.flex === 0) {
    delete newProps.style.flex;
  }

  // if fill is an object, convert it to a string using convertFill function
  if (newProps.fill && typeof newProps.fill === 'object') {
    newProps.fill = convertFill(newProps.fill);
  }

  return newProps;
};
