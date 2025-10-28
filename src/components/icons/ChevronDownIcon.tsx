import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "react-native-svg";

interface ChevronDownIconProps extends SvgProps {
  width?: number;
  height?: number;
}

export const ChevronDownIcon = ({
  width = 18,
  height = 9,
  ...props
}: ChevronDownIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 9"
      fill="none"
      {...props}
    >
      <Path
        d="M13.065 1.83899L13.86 2.63474L9.52726 6.96899C9.45783 7.03886 9.37527 7.0943 9.28434 7.13214C9.1934 7.16997 9.09588 7.18945 8.99738 7.18945C8.89889 7.18945 8.80137 7.16997 8.71043 7.13214C8.61949 7.0943 8.53693 7.03886 8.46751 6.96899L4.13251 2.63474L4.92751 1.83974L8.99626 5.90774L13.065 1.83899Z"
        fill="white"
      />
    </Svg>
  );
};
