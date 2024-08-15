import { PUTchangeUserStatusMakeChellagneIsInitial } from "@/api/supabase/user"
import { useMutation } from "@tanstack/react-query"

function useUserQuery() {
  const { mutate: userIsInitialStateChangeMutate } = useMutation({
    mutationFn: async (userId: string) =>
      await PUTchangeUserStatusMakeChellagneIsInitial(userId),
  })

  return {
    userIsInitialStateChangeMutate,
  }
}

export default useUserQuery
