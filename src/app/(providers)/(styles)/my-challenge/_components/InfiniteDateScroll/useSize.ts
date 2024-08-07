import * as React from "react"
import useResizeObserver from "@react-hook/resize-observer"

export const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = React.useState<DOMRect | null>(null)

  React.useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect())
    }
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}
