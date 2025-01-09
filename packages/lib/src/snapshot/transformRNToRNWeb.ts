import React from 'react';
import { ReactTestRendererNode } from 'react-test-renderer';
import path from 'path';
import { imageToDataURI } from './modules/image';

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

  if (jsonTree.type === 'Image') {
    const imageRelativePath: string = jsonTree.props.source.testUri;

    const reactNativeAssetFileTransformerPath = path.dirname(
      require.resolve('react-native/jest/assetFileTransformer'),
    );

    const imagePath = path.resolve(reactNativeAssetFileTransformerPath, imageRelativePath);

    const imageAsDataURI = imageToDataURI(imagePath);

    newJsonTreeProps.source = imageAsDataURI;
  }

  return React.createElement(
    RNWebEl ?? RNWebElFallback,
    newJsonTreeProps,
    transformRNToRNWeb(jsonTree.children),
  );
};
