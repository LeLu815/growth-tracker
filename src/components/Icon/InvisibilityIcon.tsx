import { SVGProps } from "react"

import Icon from "./Icon"

const InvisibilityIcon = (
  props: SVGProps<SVGSVGElement> & { color?: string }
) => {
  const { color = "#ADADAD", ...restProps } = props
  return (
    <Icon {...restProps} viewBox="0 0 28 28" fill="none">
      <g filter="url(#filter0_d_3302_5735)">
        <path
          d="M21.6615 12.0234L21.6738 12L21.6615 11.9766C20.2272 9.26308 17.2904 7.55 14 7.55C10.7096 7.55 7.7728 9.26308 6.33852 11.9766L6.32617 12L6.33852 12.0234C7.7728 14.7369 10.7096 16.45 14 16.45C17.2904 16.45 20.2272 14.7369 21.6615 12.0234ZM4.55436 12C6.04559 8.51768 9.7089 6.05 14 6.05C18.2911 6.05 21.9544 8.51768 23.4456 12C21.9544 15.4823 18.2911 17.95 14 17.95C9.7089 17.95 6.04559 15.4823 4.55436 12ZM16.2091 12C16.2091 10.8649 15.2158 9.95 14 9.95C12.7842 9.95 11.7909 10.8649 11.7909 12C11.7909 13.1351 12.7842 14.05 14 14.05C15.2158 14.05 16.2091 13.1351 16.2091 12ZM10.1636 12C10.1636 10.0471 11.8821 8.45 14 8.45C16.1179 8.45 17.8364 10.0471 17.8364 12C17.8364 13.9529 16.1179 15.55 14 15.55C11.8821 15.55 10.1636 13.9529 10.1636 12Z"
          fill="#ADADAD"
          stroke="white"
          strokeWidth="0.1"
        />
        <path
          d="M6 20L22 4"
          stroke="#ADADAD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        {/* <filter
          id="filter0_d_3302_5735"
          x="-2"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3302_5735"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3302_5735"
            result="shape"
          />
        </filter> */}
      </defs>
    </Icon>
  )
}

export default InvisibilityIcon
