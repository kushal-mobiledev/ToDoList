import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    style={{
      enableBackground: 'new 0 0 50 50',
    }}
    xmlSpace="preserve"
    {...props}>
    <Path fill="#000" d="M26 1h-2v23H1v2h23v23h2V26h23v-2H26z" />
  </Svg>
);

export default SvgComponent;
