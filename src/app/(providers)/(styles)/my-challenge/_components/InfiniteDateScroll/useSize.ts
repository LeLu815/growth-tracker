import { useLayoutEffect, useState } from "react"
import useResizeObserver from "@react-hook/resize-observer"

export const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect())
    }
  }, [target])

  useResizeObserver(target, (entry) => {
    return setSize(entry.contentRect)
  })
  return size
}
