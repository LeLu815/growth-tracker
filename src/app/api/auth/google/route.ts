import { createClient } from "@/supabase/server"

const supabase = createClient()
supabase.auth.signInWithOAuth({
  provider: "google",
})
