interface ProgressBarProps {
  progress: number
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full rounded-full bg-grey-800">
      <div
        className="h-1.5 rounded-full bg-secondary"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
