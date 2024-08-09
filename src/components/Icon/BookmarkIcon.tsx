import { SVGProps } from "react"

import Icon from "./Icon"

const BookmarkIcon = (
  props: SVGProps<SVGSVGElement> & { color?: string; filled?: boolean }
) => {
  const { filled, color, ...svgProps } = props

  return (
    <Icon {...svgProps} width="12" height="15" viewBox="0 0 12 15" fill="none">
      <path
        d="M11.25 13.7784C11.25 14.1851 10.7903 14.4217 10.4594 14.1853L6.29062 11.2076C6.11677 11.0834 5.88323 11.0834 5.70938 11.2076L1.54062 14.1853C1.20969 14.4217 0.75 14.1851 0.75 13.7784V2.75C0.75 2.35218 0.908035 1.97064 1.18934 1.68934C1.47064 1.40804 1.85218 1.25 2.25 1.25H9.75C10.1478 1.25 10.5294 1.40804 10.8107 1.68934C11.092 1.97064 11.25 2.35218 11.25 2.75V13.7784Z"
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"

      />
    </Icon>
  )
}

export default BookmarkIcon
