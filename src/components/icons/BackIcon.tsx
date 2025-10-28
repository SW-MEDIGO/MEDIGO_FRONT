import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const BackIcon = (props: SvgProps) => (
  <Svg
    width={10}
    height={17}
    viewBox="0 0 10 17"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.41379 8.485L9.48479 15.556L8.07079 16.97L0.292786 9.192C0.105315 9.00447 0 8.75016 0 8.485C0 8.21984 0.105315 7.96553 0.292786 7.778L8.07079 0L9.48479 1.414L2.41379 8.485Z"
      fill={props.fill || "black"}
    />
  </Svg>
);
