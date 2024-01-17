import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Add = ({ width = 32, height = 32, fill = "White" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" {...width} {...height} viewBox="0 0 24 24">
    <Path {...fill} d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
  </Svg>
);
export default Add;
