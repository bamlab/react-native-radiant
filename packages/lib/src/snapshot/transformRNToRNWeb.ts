import React from 'react';
import { ReactTestRendererJSON, ReactTestRendererNode } from 'react-test-renderer';
import { convertImageSource, ImageSourceProp } from './modules/image';
import { defaultTextPlaceholderColor } from './modules/defaults';
import * as ReactNativeWeb from 'react-native-web';
import { logger } from '../utils/logger';
import { transformStyle } from './modules/style';
import { additionalMappers } from '../config/configure';

const convertRNNodeToRNWeb = (node: ReactTestRendererJSON) => {
  // for components like RCTScrollView
  const nodeType = node.type.replace('RCT', '');

  const RNWebElement = ReactNativeWeb[nodeType as keyof typeof ReactNativeWeb] as
    | React.ComponentType
    | undefined;

  const RNWebElFallback = ReactNativeWeb.View;

  if (RNWebElement === undefined) {
    logger.warn(`No equivalent for ${node.type} in react-native-web`);
  }

  return RNWebElement ?? RNWebElFallback;
};

const convertNodeProps = (node: ReactTestRendererJSON) => {
  const { props, type } = node;

  const newProps = { ...props };

  newProps.style = transformStyle(newProps.style);

  switch (type) {
    case 'Image':
      newProps.source = convertImageSource(props as ImageSourceProp);
      break;
    case 'TextInput':
      newProps.placeholderTextColor = newProps.placeholderTextColor ?? defaultTextPlaceholderColor;
      break;
    default:
  }

  return newProps;
};

export const transformRNToRNWeb = (
  jsonTree: ReactTestRendererNode | ReactTestRendererNode[] | null,
): null | React.ReactNode | React.ReactNode[] => {
  // handle different types of react nodes
  if (jsonTree === null || typeof jsonTree === 'string') return jsonTree;

  if (Array.isArray(jsonTree)) {
    return jsonTree.map((node, index) => {
      const transformedNode = transformRNToRNWeb(node);
      return React.isValidElement(transformedNode)
        ? React.cloneElement(transformedNode, { key: index })
        : transformedNode;
    });
  }

  // call additional mappers first
  additionalMappers.forEach((mapper) => {
    if (
      (typeof mapper.inputElement === 'string' && jsonTree.type === mapper.inputElement) ||
      (Array.isArray(mapper.inputElement) && mapper.inputElement.includes(jsonTree.type))
    ) {
      return mapper.outputElement(jsonTree);
    }
  });

  // convert react-native nodes to react-native-web nodes
  const RNWebElement = convertRNNodeToRNWeb(jsonTree);

  // convert props
  const newJsonTreeProps = convertNodeProps(jsonTree);

  return React.createElement(RNWebElement, newJsonTreeProps, transformRNToRNWeb(jsonTree.children));
};
