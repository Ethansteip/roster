import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
const LockClosed = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 21 21" {...props}>
    <G fill="none" fillRule="evenodd" transform="translate(4 1)">
      <Path
        stroke={props.currentColour}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.5 8.5-.006-1.995C2.487 2.502 3.822.5 6.5.5s4.011 2.002 4 6.005V8.5m-8 0h8.023a2 2 0 0 1 1.994 1.85l.006.156-.017 6a2 2 0 0 1-2 1.994H2.5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"
      />
      <Circle cx={6.5} cy={13.5} r={1.5} fill={props.currentColour} />
    </G>
  </Svg>
);
export default LockClosed;
