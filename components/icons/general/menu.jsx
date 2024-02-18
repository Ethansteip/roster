import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Menu = ({ colour, ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 16 16" {...props}>
    <Path
      fill="none"
      stroke={colour || "black"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
    />
  </Svg>
);
export default Menu;
