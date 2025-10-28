import React from "react";
import Svg, { Path } from "react-native-svg";

interface CheckIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const CheckIcon = ({ width = 20, height = 15, fill = "#4A4A4A" }: CheckIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 15"
      fill="none"
    >
      <Path
        d="M6.61058 10.9687L17.2043 0.375C17.4543 0.125 17.746 0 18.0793 0C18.4127 0 18.7043 0.125 18.9543 0.375C19.2043 0.625 19.3293 0.922083 19.3293 1.26625C19.3293 1.61042 19.2043 1.90708 18.9543 2.15625L7.48558 13.6562C7.23558 13.9062 6.94391 14.0313 6.61058 14.0313C6.27724 14.0313 5.98558 13.9062 5.73558 13.6562L0.360577 8.28125C0.110577 8.03125 -0.00942308 7.73458 0.000576923 7.39125C0.0105769 7.04792 0.140993 6.75083 0.391827 6.5C0.64266 6.24917 0.939744 6.12417 1.28308 6.125C1.62641 6.12583 1.92308 6.25083 2.17308 6.5L6.61058 10.9687Z"
        fill={fill}
      />
    </Svg>
  );
};

