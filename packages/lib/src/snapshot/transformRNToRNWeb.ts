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

const convertNodeProps = ({
  type,
  props,
}: {
  type: string;
  props: Record<string, unknown> | null;
}) => {
  if (props === null) return null;

  const newProps = { ...props };

  if (newProps.style) {
    newProps.style = transformStyle(newProps.style as Record<string, unknown>);
  }

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

  let additionalMapperElement = null;
  let additionalMapperProps = null;

  // call additional mappers first
  for (const mapper of additionalMappers) {
    if (
      (typeof mapper.inputElement === 'string' && jsonTree.type === mapper.inputElement) ||
      (Array.isArray(mapper.inputElement) && mapper.inputElement.includes(jsonTree.type))
    ) {
      ({ type: additionalMapperElement, props: additionalMapperProps } =
        mapper.outputElement(jsonTree));
    }
  }

  // convert react-native nodes to react-native-web nodes
  const RNWebElement = additionalMapperElement ?? convertRNNodeToRNWeb(jsonTree);

  // convert props
  const newJsonTreeProps = convertNodeProps(
    additionalMapperElement
      ? { type: additionalMapperElement, props: additionalMapperProps }
      : jsonTree,
  );

  return React.createElement(RNWebElement, newJsonTreeProps, transformRNToRNWeb(jsonTree.children));
};
