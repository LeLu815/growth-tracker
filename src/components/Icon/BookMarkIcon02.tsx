import { SVGProps } from "react"

import Icon from "./Icon"

const BookMarkIcon02 = (
  props: SVGProps<SVGSVGElement> & {
    color?: string
    filled?: boolean
    width?: string
    height?: string
  }
) => {
  const { filled, color, width, height, ...svgProps } = props

  return (
    <Icon
      {...svgProps}
      width={width || "18"}
      height={height || "18"}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        id="Vector"
        d="M13.0959 13.6189C13.0959 14.0321 12.6233 14.267 12.294 14.0175L9.27288 11.7287C9.09432 11.5935 8.84758 11.5935 8.66902 11.7287L5.64788 14.0175C5.31857 14.267 4.84595 14.0321 4.84595 13.6189V4.625C4.84595 4.29348 4.97012 3.97554 5.19114 3.74112C5.41217 3.5067 5.71194 3.375 6.02452 3.375H11.9174C12.23 3.375 12.5297 3.5067 12.7508 3.74112C12.9718 3.97554 13.0959 4.29348 13.0959 4.625V13.6189Z"
        stroke="#1A1A1A"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default BookMarkIcon02
