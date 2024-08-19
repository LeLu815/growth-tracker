"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  GETchallenge,
  GETmilestones,
  GETroutines,
} from "@/api/supabase/challenge"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useUserQuery from "@/query/user/useUserQuery"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"

import Box from "@/components/Box"
import Button from "@/components/Button"
import Page from "@/components/Page"

import ChallengePageTitle from "../../../../create/_components/ChallengePageTitle"
import ChallengeUpdatePc from "../ChallengeUpdatePc"
import MilestoneCreateSwitch from "../MilestoneCreateSwitch/MilestoneCreateSwitch"
import MilestoneUpdateConfig from "../MilestoneUpdateConfig/MilestoneUpdateConfig"

interface ChallengeUpdateProps {
  challengeId: string
  milestoneId?: string
}
function ChallengeUpdate({ challengeId }: ChallengeUpdateProps) {
  // 유저 상태 업데이트 함수
  const { userIsInitialStateChangeMutate } = useUserQuery()
  // 업데이트가 진행되어야할 유저 id
  const [milestoneIds, setMilestoneIds] = useState<string[]>([])
  // 선택된 페이지 이름
  const [selectedPageName, setSelectedPageName] = useState<
    "switch" | "add" | "edit"
  >("switch")

  // 이전 정보 불러와서 저장하기
  // 챌린지 정보
  const { setCategory, setGoal, setRandomImgUrl, setRange } =
    useChallengeCreateStore()
  // 마일스톤과 루틴 정보
  const { setData } = useMilestoneCreateStore()

  // 토스트 열기
  const { showToast } = useToast()
  // 컨펌 모달 열기
  const { open, close } = useModal()
  // 넥스트 라우터로 보내기
  const router = useRouter()
  // 유저 데이터
  const { me, userData } = useAuth()

  // 최초 업데이트 유저면 gif 보여주기를 구현해야함. customModal
  useEffect(() => {
    if (userData?.is_challenge_first_create) {
      open({
        type: "custom",
        children: (
          <div className="fixed bottom-0 left-0 right-0 top-0 flex min-w-[320px] items-center justify-center">
            <div className="gif-container mx-auto flex w-full min-w-[320px] max-w-[480px] items-center justify-center py-[20px]">
              <img
                alt="챌린지 스위칭 이미지"
                src="/image/create_tutorial.gif"
              />
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto h-[100px] w-full min-w-[320px] max-w-[480px] bg-gradient-to-t from-white from-70% via-white to-transparent px-[20px] pb-2 pt-[20px]">
              <Button
                onClick={() => {
                  // 유저 데이터 업데이트 치기
                  me &&
                    userIsInitialStateChangeMutate(me?.id, {
                      onSuccess: () => {
                        showToast("다시 보지 않기 처리에 성공했습니다.")
                      },
                      onError: () => {
                        showToast("다시 보지 않기 처리에 실패했습니다.")
                      },
                    })
                  // 모달 닫기
                  close()
                }}
                size="lg"
                variant="outline"
              >
                다시 보지 않기
              </Button>
            </div>
          </div>
        ),
      })
    }
  }, [userData])

  // 데이터 불러오기 실패하면?
  useEffect(() => {
    ;(async () => {
      const challengeObj = await GETchallenge(challengeId)
      const milestones = await GETmilestones(challengeId)
      const temp_milestoneIds: string[] = []

      // 작성자가 아니면 수정이 불가함
      if (challengeObj && challengeObj[0].user_id !== me?.id) {
        return
      }

      // 만약에 챌린지가 끝난 상태라면 수정이 불가능하다. 되돌려보내기
      if (
        challengeObj &&
        challengeObj[0].state !== "on_progress" &&
        challengeObj[0].state !== "not_started"
      ) {
        open({
          type: "alert",
          content: "진행중인 챌린지만 수정이 가능합니다.",
        })
        return router.back()
      }

      // 오늘 날짜
      const today = new Date() // 현재 날짜와 시간
      const earliestTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      )
      const routinesPromise =
        milestones &&
        milestones.map((milestone) => {
          // 오늘 날짜보다 이전에 실행된 마일스톤 아이디 필더링 하기
          if (
            new Date(milestone.start_at).getTime() >= earliestTime.getTime()
          ) {
            temp_milestoneIds.push(milestone.id)
          }
          return GETroutines(milestone.id)
        })

      setMilestoneIds(temp_milestoneIds)
      const routines = routinesPromise ? await Promise.all(routinesPromise) : []

      // 챌린지 데이터 전역에 저장
      if (challengeObj) {
        setCategory(challengeObj[0].category!)
        setGoal(challengeObj[0].goal)
        setRandomImgUrl(challengeObj[0].image_url || "")
        setRange({
          from: new Date(challengeObj[0].start_at!),
          to: new Date(challengeObj[0].end_at!),
        })
      }
      if (milestones && routines.length !== 0) {
        const milestoneDatas: MilestoneType[] = milestones.map(
          ({ id, ...rest }) => {
            const routineDates = routines.filter(
              (routine) => routine[0].milestone_id === id
            )
            return {
              id,
              ...rest,
              routines: routineDates[0],
            }
          }
        )
        setData(milestoneDatas)
      }
    })()
    // cleanup 함수로 전역 데이터 삭제
    return () => {
      setData([])
      setRange(defaultSelected)
      setCategory(categories[0])
      setGoal("")
      setRandomImgUrl("")
    }
  }, [me])

  return (
    <>
      <div className="mx-auto flex h-screen max-w-[480px] flex-col lg:hidden">
        {selectedPageName === "switch" && (
          <>
            <ChallengePageTitle
              title={"루틴 수정"}
              allStepCount={4}
              titleHidden={false}
              handleClickGoBack={() => {
                // 컨펌 열기 => 확인이면 뒤로 가기
                return open({
                  type: "confirm",
                  content: "저장되지 않은 변경사항은 삭제됩니다.",
                  onConfirm: () => {
                    router.back()
                  },
                })
              }}
            />
            <MilestoneCreateSwitch
              challengeId={challengeId}
              milestoneIds={milestoneIds}
              goNextPage={() => setSelectedPageName("add")}
            />
          </>
        )}
        {(selectedPageName === "add" || selectedPageName === "edit") && (
          <>
            <div>
              <ChallengePageTitle
                title="루틴 생성"
                step={4}
                allStepCount={4}
                titleHidden={false}
                handleClickGoBack={() => {
                  setSelectedPageName("switch")
                }}
              />
              <Page>
                <Box className="mt-[28px]">
                  <MilestoneUpdateConfig
                    goNextPage={() => setSelectedPageName("switch")}
                  />
                </Box>
              </Page>
            </div>
          </>
        )}
      </div>
      <ChallengeUpdatePc
        milestoneIds={milestoneIds}
        challengeId={challengeId}
      />
    </>
  )
}

export default ChallengeUpdate
