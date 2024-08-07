import { useLayoutEffect, useState } from "react"
import useResizeObserver from "@react-hook/resize-observer"

export const useSize = (target: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    console.log(target.current)
    if (target.current) {
      console.log(target.current)
      setSize(target.current.getBoundingClientRect())
    }
  }, [target])

  useResizeObserver(target, (entry) => {
    console.log("entry :", entry)
    return setSize(entry.contentRect)
  })
  return size
}
