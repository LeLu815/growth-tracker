interface PortionStickBarType {
  prevValue: number[]
  currentValue: number
  nextValue: number[]
}

function PortionStickBar({
  prevValue,
  currentValue,
  nextValue,
}: PortionStickBarType) {
  const first = prevValue.reduce((prev, curr) => prev + curr)
  const last = nextValue.reduce((prev, curr) => prev + curr)
  const parent = first + last + currentValue

  const firstWidthStyle = `${handlePercentFormatFunc({ child: first, mother: parent })}%`
  const currentWidthStlye = `${handlePercentFormatFunc({ child: currentValue, mother: parent })}%`
  const lastWidthStyle = `${handlePercentFormatFunc({ child: last, mother: parent })}%`

  return (
    <div className="flex h-5 w-full rounded border border-slate-500">
      <div
        className={`h-full bg-slate-200`}
        style={{ width: firstWidthStyle }}
      ></div>
      <div
        className={`h-full bg-slate-500 hover:brightness-50`}
        style={{ width: currentWidthStlye }}
      ></div>
      <div
        className={`h-full bg-slate-200`}
        style={{ width: lastWidthStyle }}
      ></div>
    </div>
  )
}

export default PortionStickBar

const handlePercentFormatFunc = ({
  child,
  mother,
}: {
  child: number
  mother: number
}) => {
  return Math.round((child / mother) * 100)
}
