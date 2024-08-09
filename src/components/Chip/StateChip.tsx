import Chip from "@/components/Chip/Chip"
import { convertStatusToKorean } from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeInfo"

function StateChip({ state }: { state: string }) {
  const statusLabel = convertStatusToKorean(state)

  let intent: "primary" | "secondary" | "third" | "category" = "primary"
  let variant: "outline" | "contained" | "selected" = "contained"

  switch (state) {
    case "on_progress":
      intent = "primary"
      break
    case "on_complete":
      intent = "primary"
      variant = "outline"
      break
    case "on_fail":
      intent = "third"
      variant = "outline"
      break
    case "not_started":
      intent = "third"
      variant = "outline"
      break
    default:
      intent = "primary"
  }

  return (
    <Chip
      label={statusLabel as string}
      intent={intent}
      variant={variant}
      size="sm"
    />
  )
}

export default StateChip
