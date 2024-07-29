import {createClient} from "@/supabase/client";
import {NextResponse} from "next/server";

export async function GET() {


const supabase = createClient();

  const { data, error } = await supabase
  .from('users_notice')
  .insert([
    { content: 'test'},
  ])
  .select()


  return NextResponse.json(data)
}