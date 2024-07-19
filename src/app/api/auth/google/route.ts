import { NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function POST() {
  const supabase = createClient()
  supabase.auth.signInWithOAuth({
    provider: "google",
  })
  return NextResponse.json("")
}
