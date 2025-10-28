import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const HomeAddressIcon: React.ComponentType<SvgProps> = (props) => {
  return (
    <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" {...props}>
      <Path d="M0 18V6L8.5 0L17 6V18H10.625V11H6.375V18H0Z" fill="#4A4A4A" />
    </Svg>
  );
};
