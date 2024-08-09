import Box from "@/components/Box"
import Page from "@/components/Page"
import StatusBarSpace from "@/components/StatusBarSpace"
import TopNavigation from "@/components/TopNavigation"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"

function MyChallengePage() {
  return (
    <Page>
      <StatusBarSpace />
      <TopNavigation title="내 챌린지" />

      <MyChallengeNavBar />

      <DatePickerContainer />

      <ChallengeList />
    </Page>
  )
}

export default MyChallengePage
