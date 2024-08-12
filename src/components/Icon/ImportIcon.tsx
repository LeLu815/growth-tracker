import { SVGProps } from "react"

import Icon from "@/components/Icon/Icon"

const ImportIcon = (props: SVGProps<SVGSVGElement> & { color?: string }) => (
  <Icon
    {...props}
    width={props.width}
    height={props.height}
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector 4960"
      d="M14.0445 5.02299V2C14.0445 1.44772 13.5968 1 13.0445 1H2.33335C1.78107 1 1.33335 1.44771 1.33335 2V16.092C1.33335 16.6442 1.78107 17.092 2.33335 17.092H6.00002M14.0445 5.02299V16.092C14.0445 16.6442 13.5967 17.092 13.0445 17.092H6.00002M14.0445 5.02299H17.6667C18.219 5.02299 18.6667 5.4707 18.6667 6.02299V20C18.6667 20.5523 18.219 21 17.6667 21H7.00002C6.44774 21 6.00002 20.5523 6.00002 20V17.092M4.66669 5.13793H10.6667M4.66669 9.27586H8.00002"
      stroke="#1A1A1A"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
)

export default ImportIcon
