import { StyleSheet } from 'react-native';

// flex: 0 is not implemented the same way in react-native-web and react-native, this function provides a fix for this issue
// for more info, see https://github.com/necolas/react-native-web/issues/2687
const fixFlexZeroStyles = (style: Record<string, unknown>) => {
  if (style.flex === 0) {
    return { flexBasis: 'auto', flexShrink: 0, flexGrow: 0, ...style, flex: undefined };
  }

  return style;
};

export const transformStyle = (style: Record<string, unknown>) => {
  let newStyle;

  if (Array.isArray(style)) {
    newStyle = StyleSheet.flatten(style);
  } else {
    newStyle = { ...style };
  }

  return fixFlexZeroStyles(newStyle);
};
