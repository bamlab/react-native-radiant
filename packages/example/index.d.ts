declare module '*.jpg' {
  import { ImageRequireSource } from 'react-native';
  const value: ImageRequireSource;
  export default value;
}
declare module '*.svg' {
  import { FunctionComponent } from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: FunctionComponent<SvgProps>;
  export default content;
}
