import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"

function MyChallengePage() {
  return (
    <Page>
      <Box>
        <h1 className="mb-8 ml-2 text-[20px] font-bold">내 챌린지</h1>
        <div className="flex flex-col items-center">
          <MyChallengeNavBar />
          <DatePickerContainer />
          <ChallengeList />
        </div>
      </Box>
    </Page>
  )
}

export default MyChallengePage
