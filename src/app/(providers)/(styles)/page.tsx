import ComputerComponent from "./_components/ComputerComponent"
import CreateImportComponent from "./_components/CreateImportComponent"
import TrophyComponent from "./_components/TrophyComponent"
import YouDidItComponent from "./_components/YouDidItComponent"

function OnboardingPage() {
  return (
    <div>
      <ComputerComponent />
      <YouDidItComponent />
      <TrophyComponent />
      <CreateImportComponent />
    </div>
  )
}

export default OnboardingPage
