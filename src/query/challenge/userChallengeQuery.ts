import {
  POSTchallenge,
  POSTchallengeArgumentType,
  PUTchallenge,
  PUTchallengeArgumentType,
} from "@/api/supabase/challenge"
import { useMutation } from "@tanstack/react-query"

import queryClient from "../queryClient"

const CHALLENGE_QEURY_KEY = "challenge"

function useChallengeQuery() {
  const { isPending: challengeCreateIsPending, mutate: challengeCreateMutate } =
    useMutation({
      mutationFn: async (variables: POSTchallengeArgumentType) =>
        await POSTchallenge(variables),
      onSuccess: () => {
        // 모달 추가
        alert("성공했어!")
        queryClient.invalidateQueries({ queryKey: [CHALLENGE_QEURY_KEY] })
      },
      onError: () => {
        // 모달 추가
        alert("실패했어")
      },
    })

  const { isPending: challengeUpdateIsPending, mutate: challengeUpdateMutate } =
    useMutation({
      mutationFn: async (variables: PUTchallengeArgumentType) =>
        await PUTchallenge(variables),
      onSuccess: (data, variables) => {
        // 모달 추가
        alert("성공했어!")
        queryClient.invalidateQueries({
          queryKey: [CHALLENGE_QEURY_KEY, variables["challenge-id"]],
        })
      },
      onError: () => {
        // 모달 추가
        alert("실패했어")
      },
    })

  return {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateIsPending,
    challengeUpdateMutate,
  }
}

export default useChallengeQuery
