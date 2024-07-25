import { redirect } from "next/navigation"
import { createClient } from "@/supabase/server"

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}
