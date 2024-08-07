"use client"

import * as React from "react"
import useResizeObserver from "@react-hook/resize-observer"

const useSize = (target) => {
  const [size, setSize] = React.useState()

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}

export default function Page() {
  const target = React.useRef(null)
  const size = useSize(target)
  console.log(size)
  return (
    <pre ref={target}>
      {JSON.stringify({ width: size?.width, height: size?.height }, null, 2)}
    </pre>
  )
}
