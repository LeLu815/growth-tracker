import { SVGProps } from "react"
import Icon from "./Icon"

const SendIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => {
  const { color, stroke, width, height, ...svgProps } = props

  return (
      <Icon
          {...props}
          width={width} // Apply the width here
          height={height} // Apply the height here
          viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">

        <path
            id="Subtract"
            d="M1 12.7639C1 14.2507 2.56462 15.2177 3.89443 14.5528L9 12L13.4223 9.78885C14.8964 9.05181 14.8964 6.94819 13.4223 6.21115L3.89443 1.44721C2.56463 0.782313 1 1.7493 1 3.23607V6.20948C1 6.71195 1.37977 7.13313 1.87955 7.18496V7.18496C3.05229 7.30658 3.05228 9.01431 1.87955 9.13593V9.13593C1.37976 9.18776 1 9.60895 1 10.1114V12.7639Z"
            stroke={color ? color : "#ADADAD"}
            fill={color ? color : "#ADADAD"}
        />
      </Icon>

)
}

export default SendIcon
