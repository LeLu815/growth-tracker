import { useRouter } from "next/navigation"
import {
  DELETEchallenge,
  POSTchallenge,
  POSTchallengeArgumentProps,
  PUTchallenge,
  PUTchallengeArgumentProps,
} from "@/api/supabase/challenge"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  initialData,
} from "@/store/milestoneCreate.store"
import { useMutation } from "@tanstack/react-query"

import queryClient from "../queryClient"

const CHALLENGE_QEURY_KEY = "challenge"

function useChallengeQuery() {
  const { setRange, setGoal, setCategory, setRandomImgUrl } =
    useChallengeCreateStore()
  const { setCurrentSlideId, setData } = useMilestoneCreateStore()
  const router = useRouter() // useRouter 훅 사용
  const { open } = useModal()
  const { showToast } = useToast()
  // 챌린지 생성
  const { isPending: challengeCreateIsPending, mutate: challengeCreateMutate } =
    useMutation({
      mutationFn: async (variables: POSTchallengeArgumentProps) =>
        await POSTchallenge(variables),
      onSuccess: () => {
        // 이전 데이터 초기화
        queryClient.invalidateQueries({ queryKey: [CHALLENGE_QEURY_KEY] })
        setRange(defaultSelected)
        setCurrentSlideId("")
        setData(initialData)
        setGoal("")
        setCategory(categories[0])
        setRandomImgUrl("")
      },
      onError: () => {
        // 모달 추가
        showToast("생성이 실패 되었습니다.")
      },
    })

  // 챌린지 업데이트
  const { isPending: challengeUpdateIsPending, mutate: challengeUpdateMutate } =
    useMutation({
      mutationFn: async (variables: PUTchallengeArgumentProps) =>
        await PUTchallenge(variables),
      onSuccess: (data, variables) => {
        // 모달 추가
        showToast("챌린지 생성이 성공했습니다.")
        queryClient.invalidateQueries({
          queryKey: [CHALLENGE_QEURY_KEY, variables["challenge-id"]],
        })
        setRange(defaultSelected)
        setCurrentSlideId("")
        setData(initialData)
        return router.push("/newsfeed")
      },
      onError: () => {
        // 모달 추가
        showToast("생성이 실패 되었습니다.")
      },
    })

  // 챌린지 삭제 함수
  const { isPending: challengeDeleteIsPending, mutate: challengeDeleteMutate } =
    useMutation({
      mutationFn: async (challengeId: string) =>
        await DELETEchallenge(challengeId),
    })
  return {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateIsPending,
    challengeUpdateMutate,
    challengeDeleteIsPending,
    challengeDeleteMutate,
  }
}

export default useChallengeQuery
