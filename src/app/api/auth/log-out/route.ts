import { NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function DELETE() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return NextResponse.json("you are now logged-out")
}
