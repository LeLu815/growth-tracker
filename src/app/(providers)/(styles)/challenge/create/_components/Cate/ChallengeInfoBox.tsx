interface ChallengeInfoBoxProps {
  challengePeriod: string
  goal: string
  catetegory: string
}

function ChallengeInfoBox({
  challengePeriod,
  goal,
  catetegory,
}: ChallengeInfoBoxProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div>📅 {challengePeriod}</div>
        <div>{goal}</div>
      </div>
      <div>{catetegory}</div>
    </div>
  )
}

export default ChallengeInfoBox
