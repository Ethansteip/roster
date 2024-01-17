import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Other = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 16 16" {...props}>
    <Path
      fill={props.active ? "#52DFC6" : "#ffffff"}
      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
    />
  </Svg>
);
export default Other;
