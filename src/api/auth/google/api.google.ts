import { createClient } from "@/supabase/client"

export async function getGoogleLogin() {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://example.com/auth/callback`,
    },
  })
}
