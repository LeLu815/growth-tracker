import { SVGProps } from "react"

import Icon from "./Icon"

const SendIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => {
  const { color, stroke, ...svgProps } = props
  console.log(color)
  return (
    <Icon
      {...props}
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon/enter">
        <path
          id="Subtract"
          d="M4 16.7639C4 18.2507 5.56462 19.2177 6.89443 18.5528L12 16L16.4223 13.7889C17.8964 13.0518 17.8964 10.9482 16.4223 10.2111L6.89443 5.44721C5.56463 4.78231 4 5.7493 4 7.23607V10.2095C4 10.7119 4.37977 11.1331 4.87955 11.185V11.185C6.05229 11.3066 6.05228 13.0143 4.87955 13.1359V13.1359C4.37976 13.1878 4 13.6089 4 14.1114V16.7639Z"
          stroke={color ? color : "#ADADAD"}
          fill={color ? color : "#ADADAD"}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </g>
    </Icon>
  )
}
export default SendIcon
