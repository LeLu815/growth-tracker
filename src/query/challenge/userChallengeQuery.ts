import {
  POSTchallenge,
  POSTchallengeArgumentType,
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

  return { challengeCreateMutate, challengeCreateIsPending }
}

export { useChallengeQuery }
