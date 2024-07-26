// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@/supabase/server"

// export async function POST(request: NextRequest) {
//   const data = await request.json()
//   const email = data.email as string
//   const password = data.password as string
//   const supabase = createClient()
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })

//   console.log("로그인 error :", error?.code, error?.name, error)
//   if (error && error.message === 'Invalid login credentials') {
//     // Get all property names of the error object
//     let properties = Object.getOwnPropertyNames(error);

//     // Create an array to store property-value pairs
//     let propertyStrings = [];

//     // Iterate over each property and build the output string
//     properties.forEach(function (prop) {
//       console.log(prop, error[prop]);  // Log each property and its value
//       propertyStrings.push(prop + ': ' + error[prop]);
//   });
//   let alertMessage = propertyStrings.join('\n');
//   }
//   if (!user) {
//     return NextResponse.json({ error: "Wrong information." }, { status: 401 })
//   }
//   return NextResponse.json(user)
// }

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/supabase/server"

export async function POST(request: NextRequest) {
  const data = await request.json()
  const email = data.email as string
  const password = data.password as string
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (!user) {
    return NextResponse.json({ error: "Wrong information." }, { status: 401 })
  }

  return NextResponse.json(user)
}
