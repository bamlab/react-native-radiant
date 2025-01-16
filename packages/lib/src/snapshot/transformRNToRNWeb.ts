import React from 'react';
import { ReactTestRendererNode } from 'react-test-renderer';
import { convertImageSource, ImageSourceProp } from './modules/image';

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
  const RNWebEl = require('react-native-web')[nodeType];
  const RNWebElFallback = require('react-native-web')['View'];

  if (RNWebEl === undefined) {
    console.warn(`No equivalent for ${jsonTree.type} in react-native-web`);
  }

  let newJsonTreeProps = jsonTree.props;

  switch (jsonTree.type) {
    case 'Image':
      newJsonTreeProps.source = convertImageSource(jsonTree.props as ImageSourceProp);
      break;
    case 'TextInput':
      if (!('placeholderTextColor' in jsonTree.props)) {
        newJsonTreeProps.placeholderTextColor = 'rgba(0, 0, 0, 0.3)';
      }
      break;
    default:
  }

  return React.createElement(
    RNWebEl ?? RNWebElFallback,
    newJsonTreeProps,
    transformRNToRNWeb(jsonTree.children),
  );
};
