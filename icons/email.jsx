import * as React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";
const Email = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={32} viewBox="0 0 14 14" {...props}>
    <G fill="none" stroke={props.currentColour} strokeLinecap="round" strokeLinejoin="round">
      <Rect width={13} height={10.5} x={0.5} y={1.75} rx={1} />
      <Path d="m.5 3 5.86 5a1 1 0 0 0 1.28 0l5.86-5" />
    </G>
  </Svg>
);
export default Email;
