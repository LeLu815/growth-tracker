import { NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export const GET = async () => {
  const supabase = createClient()
  const { data: RoutineDone, error } = await supabase
    .from("routine_done")
    .select()

  if (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      target: "routine-done",
    })
  }

  return NextResponse.json(RoutineDone)
}
