import React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeIconProps {
  size?: number;
  color?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({
  size = 24,
  color = "#A2A2A2",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Path
        d="M6 31.5V13.5L18 4.5L30 13.5V31.5H21V21H15V31.5H6Z"
        fill={color}
      />
    </Svg>
  );
};
