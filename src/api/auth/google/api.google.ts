import { createClient } from "@/supabase/client"

export async function getGoogleLogin() {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: "google",
  })
}

export async function getLogout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return error
}

export async function getMe() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return user.email
  } else {
    return ""
  }
}
