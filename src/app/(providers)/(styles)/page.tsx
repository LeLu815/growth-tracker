import ComputerComponent from "./_components/ComputerComponent"
import TrophyComponent from "./_components/TrophyComponent"
import YouDidItComponent from "./_components/YouDidItComponent"

function OnboardingPage() {
  return (
    <div>
      <ComputerComponent />
      <YouDidItComponent />
      <TrophyComponent />
    </div>
  )
}

export default OnboardingPage
