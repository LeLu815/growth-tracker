import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao/callback`,
    },
  })
  
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}
