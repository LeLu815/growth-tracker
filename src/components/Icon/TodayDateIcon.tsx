import { SVGProps } from "react"

import Icon from "./Icon"

const TodayDateIcon = (
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
      width={width || "24"}
      height={height || "26"}
      viewBox="0 0 24 26"
      fill="none"
    >
      <path
        id="Icon"
        d="M5.33301 1.66667L5.33271 4.50424M5.33271 4.50424L18.6656 4.504M5.33271 4.50424C3.12356 4.50424 1.33291 6.22469 1.33301 8.3472L1.33363 21.1572C1.33373 23.2795 3.12451 25 5.33351 25H18.6665C20.8756 25 22.6664 23.2793 22.6663 21.1568L22.6657 8.34684C22.6656 6.22447 20.8746 4.504 18.6656 4.504M18.6663 1.66667L18.6656 4.504M9.99967 16.3333V19.8889H6.48952M9.21964 18.7907C7.81102 17.8628 6.87954 16.2543 6.87954 14.4255C6.87954 11.5518 9.17937 9.22223 12.0163 9.22223C14.1375 9.22223 15.9583 10.5245 16.7422 12.3827C17.4497 14.0569 17.2192 15.9194 16.2887 17.3586"
        stroke="#1D1D1D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default TodayDateIcon
