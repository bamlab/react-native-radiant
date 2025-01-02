import React from 'react';
import { ReactTestRendererNode } from 'react-test-renderer';

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

  return React.createElement(
    RNWebEl ?? RNWebElFallback,
    jsonTree.props,
    transformRNToRNWeb(jsonTree.children),
  );
};
