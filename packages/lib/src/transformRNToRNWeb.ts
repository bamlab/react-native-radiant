import React from "react";
import { ReactTestRendererNode } from "react-test-renderer";

export const transformRNToRNWeb = (
  jsonTree: ReactTestRendererNode | ReactTestRendererNode[] | null
): null | React.ReactNode | React.ReactNode[] => {
  if (jsonTree === null) return null;

  if (Array.isArray(jsonTree)) {
    return jsonTree.map(transformRNToRNWeb);
  }

  if (typeof jsonTree === "string") {
    return jsonTree;
  }

  var nodeType = jsonTree.type.replace("RCT", "");
  var RNWebEl = require("react-native-web")[nodeType];

  return React.createElement(
    RNWebEl,
    jsonTree.props,
    transformRNToRNWeb(jsonTree.children)
  );
};
