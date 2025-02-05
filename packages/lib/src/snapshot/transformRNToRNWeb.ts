import React from 'react';
import { ReactTestRendererNode } from 'react-test-renderer';
import { convertImageSource, ImageSourceProp } from './modules/image';
import { defaultTextPlaceholderColor } from './modules/defaults';

import * as ReactNativeWeb from 'react-native-web';
import { logger } from '../utils/logger';

export const transformRNToRNWeb = (
  jsonTree: ReactTestRendererNode | ReactTestRendererNode[] | null,
): null | React.ReactNode | React.ReactNode[] => {
  if (jsonTree === null) return null;

  if (Array.isArray(jsonTree)) {
    return jsonTree.map((node, index) => {
      const transformedNode = transformRNToRNWeb(node);
      return React.isValidElement(transformedNode)
        ? React.cloneElement(transformedNode, { key: index })
        : transformedNode;
    });
  }

  if (typeof jsonTree === 'string') {
    return jsonTree;
  }

  const nodeType = jsonTree.type.replace('RCT', '');
  const RNWebEl = ReactNativeWeb[nodeType as keyof typeof ReactNativeWeb] as
    | React.ComponentType
    | undefined;
  const RNWebElFallback = ReactNativeWeb.View;

  if (RNWebEl === undefined) {
    logger.warn(`No equivalent for ${jsonTree.type} in react-native-web`);
  }

  const newJsonTreeProps = jsonTree.props;

  switch (jsonTree.type) {
    case 'Image':
      newJsonTreeProps.source = convertImageSource(jsonTree.props as ImageSourceProp);
      break;
    case 'TextInput':
      newJsonTreeProps.placeholderTextColor =
        newJsonTreeProps.placeholderTextColor ?? defaultTextPlaceholderColor;
      break;
    default:
  }

  return React.createElement(
    RNWebEl ?? RNWebElFallback,
    newJsonTreeProps,
    transformRNToRNWeb(jsonTree.children),
  );
};
