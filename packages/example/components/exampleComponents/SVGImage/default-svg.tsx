import Svg, { Rect, Path } from 'react-native-svg';
const SvgComponent = (props: Record<string, string | number>) => (
  <Svg width={83} height={57} fill="none" {...props}>
    <Rect width={83} height={57} fill="red" rx={2} />
    <Path fill="#D9D9D9" d="M58 28.5 33.25 42.79V14.21L58 28.5Z" />
  </Svg>
);
export default SvgComponent;
