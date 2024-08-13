import { SVGProps } from "react"

import Icon from "./Icon"

const ThumbsUpIcon = (
  props: SVGProps<SVGSVGElement> & {
    color?: string
    filled?: boolean
    stroke?: string
  }
) => {
  const { filled, color, stroke, ...svgProps } = props

  return (
    <Icon {...svgProps} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.57256 20.9999H4.82902C4.34394 20.9999 3.87872 20.8102 3.53571 20.4727C3.1927 20.1351 3 19.6773 3 19.1999V12.8999C3 12.4226 3.1927 11.9647 3.53571 11.6272C3.87872 11.2896 4.34394 11.0999 4.82902 11.0999H7.57256M13.9741 9.29996V5.69998C13.9741 4.9839 13.6851 4.29715 13.1706 3.79081C12.6561 3.28446 11.9582 3 11.2306 3L7.57256 11.0999V20.9999H17.8882C18.3293 21.0048 18.7574 20.8527 19.0935 20.5715C19.4296 20.2903 19.6511 19.8991 19.7173 19.4699L20.9793 11.3699C21.0191 11.112 21.0014 10.8486 20.9275 10.598C20.8535 10.3474 20.7251 10.1156 20.5512 9.91872C20.3772 9.72182 20.1618 9.5645 19.9199 9.45765C19.678 9.35081 19.4154 9.29701 19.1503 9.29996H13.9741Z"
        stroke={stroke ? stroke : "#D9D9D9"}
        fill={"none"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default ThumbsUpIcon
