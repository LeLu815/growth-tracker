import { ReactNode, SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string
  width?: number | string
  height?: number | string
  children: ReactNode
  className?: string
}

const Icon = ({
  color = "#ACACAC",
  width = 24,
  height = 24,
  children,
  className,
  ...props
}: IconProps) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      className={className}
      {...props}
    >
      {children}
    </svg>
  )
}

export default Icon
