import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowRight = ({ colour, size }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill={colour}
      d="m14.475 12-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887L14.475 12Z"
    />
  </Svg>
);
export default ArrowRight;
