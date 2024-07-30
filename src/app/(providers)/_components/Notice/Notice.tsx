// "use client"
//
// import React, { useEffect, useState } from "react"
// import { useAuth } from "@/context/auth.context"
// import { createClient } from "@/supabase/client"
//
// function Notice() {
//   const { me } = useAuth()
//   const [isShowNotice, setIsShowNotice] = useState(false)
//
//   const handleToggleNotice = () => {
//     setIsShowNotice(!isShowNotice)
//   }
//
//   const handleInserts = (payload) => {
//     console.log("Change received!", payload)
//   }
//
//   useEffect(() => {
//     const supabase = createClient()
//
//     supabase
//       .channel("users_notice")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "users_notice",
//           filter: `user_id=eq.${me?.id}`,
//         },
//         handleInserts
//       )
//       .subscribe()
//   }, [me?.id])
//
//   return (
//     <div className={"fixed right-0 top-0"}>
//       <div
//         className={`fixed right-0 h-12 w-12 rounded-full bg-blue-500 ${isShowNotice && "hidden"}`}
//         onClick={handleToggleNotice}
//       ></div>
//       <div className={"fixed right-0"}>
//         <div
//           className={`bg-white-100 relative mb-4 h-[auto] w-[300px] rounded border-l-4 border-green-400 p-4 ${isShowNotice || "hidden"}`}
//           role="alert"
//         >
//           <span
//             className="absolute bottom-0 right-0 top-0 px-4 py-3"
//             onClick={handleToggleNotice}
//           >
//             <svg
//               className="fixed right-0 h-6 w-6 fill-current text-gray-500"
//               role="button"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//             >
//               <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.586 7.066 4.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
//             </svg>
//           </span>
//           <span className="block">asdsadssadasdasdsa</span>
//           <span className="block">asdsadssadsaasds</span>
//         </div>
//       </div>
//     </div>
//   )
// }
//
// export default Notice
