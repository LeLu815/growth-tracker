import { SVGProps } from "react"

import Icon from "./Icon"

const RightArrowIcon = (
  props: SVGProps<SVGSVGElement> & { color?: string; filled?: boolean }
) => {
  const { filled, color, ...svgProps } = props

  return (
    <Icon {...svgProps}>
      <path
        id="Path "
        d="M10 18L15.2929 12.7071C15.6834 12.3166 15.6834 11.6834 15.2929 11.2929L10 6"
        stroke={filled ? color || "black" : color || "#D9D9D9"}
        fill={filled ? "#3d3d3d" : "none"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default RightArrowIcon
