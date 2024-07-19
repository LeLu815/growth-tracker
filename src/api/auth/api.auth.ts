import { createClient } from "@/supabase/client"

type handleSocialLoginProvidere = "google" | "kakao"

export async function handleSocialLogin(provider: handleSocialLoginProvidere) {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: provider,
  })
}
