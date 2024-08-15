import { createClient } from "@/supabase/client"

// 튜토리얼 이미지 확인 완료처리하기
export const PUTchangeUserStatusMakeChellagneIsInitial = async (
  userId: string
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("users")
    .update({ is_challenge_first_create: false })
    .eq("id", userId)
  if (error) throw Error(`${error.code}`)
  return data
}
