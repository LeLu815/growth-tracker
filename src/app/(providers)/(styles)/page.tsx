import ComputerComponent from "./_components/ComputerComponent"
import CreateImportComponent from "./_components/CreateImportComponent"
import EnjoyChallengeComponent from "./_components/EnjoyChallengeComponent"
import InfiniteCardComponent from "./_components/InfiniteCardComponent"
import TrophyComponent from "./_components/TrophyComponent"
import YouDidItComponent from "./_components/YouDidItComponent"

function OnboardingPage() {
  return (
    <div>
      <ComputerComponent />
      <YouDidItComponent />
      <TrophyComponent />
      <CreateImportComponent />
      <InfiniteCardComponent />
      <EnjoyChallengeComponent />
      <div className="bg-[#FFF9FA] py-[80px]" />
    </div>
  )
}

export default OnboardingPage
