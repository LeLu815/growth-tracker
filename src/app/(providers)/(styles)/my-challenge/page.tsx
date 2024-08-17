"use client"

import { useEffect } from "react"
import useGraphSliceCountStore from "@/store/graphSliceCount.store"

import Box from "@/components/Box"
import Loading from "@/components/Loading"
import Page from "@/components/Page"
import TopNavigation from "@/components/TopNavigation"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import FutureChallengeList from "./_components/FutureChallengeList"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"
import useMyChallengePageContext from "./context"

function MyChallengePage() {
  const {
    pageToView,
    challengeDataPending,
    routineDoneDailyPending,
    challengeDataError,
    routineDoneDailyError,
  } = useMyChallengePageContext()

  const setCurrentCount = useGraphSliceCountStore(
    (state) => state.setCurrentCount
  )
  useEffect(() => {
    setCurrentCount(0)
  }, [])

  // 항상 표시되는 컴포넌트
  const renderAlwaysVisibleMobileComponents = () => (
    <>
      <TopNavigation title="내 챌린지" />
      <MyChallengeNavBar />
    </>
  )

  // 데이터 불러오는 상태가 Pending 또는 Error 상태인 경우에 표시되는 메시지
  const renderLoadingOrError = () => (
    <Page>
      {challengeDataPending || routineDoneDailyPending ? (
        <Loading />
      ) : (
        <div className="mt-5 w-full text-center">
          서버에서 데이터 로드 중 오류 발생
        </div>
      )}
    </Page>
  )

  // 모바일 레이아웃
  const renderMobileLayout = () => (
    <Page>
      {renderAlwaysVisibleMobileComponents()}
      <div>
        {pageToView === "onProgress" ? (
          <>
            <DatePickerContainer />
            <ChallengeList />
          </>
        ) : (
          <FutureChallengeList />
        )}
      </div>
    </Page>
  )

  // 웹 레이아웃
  const renderWebLayout = () => (
    <Page>
      <Box>
        <div className="flex w-full flex-row justify-between gap-x-[30px]">
          <div className="w-[594px] rounded-[20px] border-[1.5px] border-solid border-[#d9d9d9] px-[30px] py-[20px] shadow-2">
            <DatePickerContainer />
            <ChallengeList />
          </div>
          <div className="w-[320px]">
            <h3 className="text-[20px] font-[700] leading-[27px]">
              진행전 챌린지
            </h3>
            <FutureChallengeList />
          </div>
        </div>
      </Box>
    </Page>
  )

  // 조건에 따른 화면 렌더링
  if (
    challengeDataPending ||
    routineDoneDailyPending ||
    challengeDataError ||
    routineDoneDailyError
  ) {
    return renderLoadingOrError()
  }

  return (
    <>
      <div className="lg:hidden">{renderMobileLayout()}</div>
      <div className="hidden lg:block">{renderWebLayout()}</div>
    </>
  )
}

export default MyChallengePage
