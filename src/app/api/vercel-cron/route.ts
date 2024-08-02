import { NextRequest, NextResponse } from "next/server"
import {createClient} from "@/supabase/client";


export async function GET(req: NextRequest) {

  const supabase = createClient();

  const { data, error } = await supabase.functions.invoke('hello-world', {
    body: { name: 'Functions' },
  })
}
