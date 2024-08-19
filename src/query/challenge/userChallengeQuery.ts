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
import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
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
      },
    })

  // 챌린지 업데이트
  const { isPending: challengeUpdateIsPending, mutate: challengeUpdateMutate } =
    useMutation({
      mutationFn: async (variables: PUTchallengeArgumentProps) =>
        await PUTchallenge(variables),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [CHALLENGE_QEURY_KEY, variables["challenge-id"]],
        })
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
