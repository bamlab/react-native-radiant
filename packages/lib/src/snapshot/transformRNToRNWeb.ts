import React from 'react';
import { ReactTestRendererJSON, ReactTestRendererNode } from 'react-test-renderer';
import { convertImageSource, ImageSourceProp } from './modules/image';
import { defaultTextPlaceholderColor } from './modules/defaults';
import * as ReactNativeWeb from 'react-native-web';
import { logger } from '../utils/logger';
import { transformStyle } from './modules/style';
import { additionalMappers } from '../config/configure';

const convertRNNodeToWebNode = (node: ReactTestRendererJSON) => {
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

const convertNodeProps = ({
  type,
  props,
}: {
  type: string;
  props: Record<string, unknown> | null;
}) => {
  if (props === null) return null;

  const newProps = { ...props };

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

const getWebNode = (rnNode: ReactTestRendererJSON) => {
  // call additional mappers first
  for (const mapper of additionalMappers) {
    if (
      (typeof mapper.inputElement === 'string' && rnNode.type === mapper.inputElement) ||
      (Array.isArray(mapper.inputElement) && mapper.inputElement.includes(rnNode.type))
    ) {
      return mapper.outputElement(rnNode);
    }
  }

  // else, convert the node to react-native-web node
  const type = convertRNNodeToWebNode(rnNode);
  const props = convertNodeProps(rnNode);
  return { type, props };
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

  const { type, props } = getWebNode(jsonTree);

  const transformedProps = { ...props } as Record<string, unknown>;

  if (transformedProps.style) {
    transformedProps.style = transformStyle(transformedProps.style as Record<string, unknown>);
  }

  return React.createElement(type, transformedProps, transformRNToRNWeb(jsonTree.children));
};
