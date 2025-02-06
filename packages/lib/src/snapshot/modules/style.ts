const fixFlexZeroStyles = (style: Record<string, unknown>) => {
  if (style.flex === 0) {
    return { ...style, flex: undefined, flexBasis: 'auto', flexShrink: 0, flexGrow: 0 };
  }

  return style;
};

export const fixStyle = (style: Record<string, unknown>) => {
  let newStyle = { ...style };

  newStyle = fixFlexZeroStyles(newStyle);

  return newStyle;
};
