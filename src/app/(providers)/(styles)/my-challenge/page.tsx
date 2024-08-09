"use client"

import Page from "@/components/Page"
import StatusBarSpace from "@/components/StatusBarSpace"
import TopNavigation from "@/components/TopNavigation"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"
import useMyChallengePageContext from "./context"

function MyChallengePage() {
  const { pageToView } = useMyChallengePageContext()
  return (
    <Page>
      <StatusBarSpace />
      <TopNavigation title="내 챌린지" />

      <MyChallengeNavBar />

      <div>
        {pageToView == "onProgress" ? (
          <>
            <DatePickerContainer />
            <ChallengeList />
          </>
        ) : (
          <div className="mt-10">예정된 챌린지 모아서 보여주는 페이지?!</div>
        )}
      </div>
    </Page>
  )
}

export default MyChallengePage
