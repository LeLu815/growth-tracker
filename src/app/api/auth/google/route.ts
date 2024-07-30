import { redirect } from "next/navigation"
import { createClient } from "@/supabase/server"

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`,
    },
  })

  
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}
