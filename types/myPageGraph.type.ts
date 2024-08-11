import { Database } from "./supabase"

export type MyPageGraphType = {
  allUserSuccessRateList: Database["public"]["Functions"]["get_success_rate_distribution"]["Returns"]
  userUserSuccessRateList: Database["public"]["Functions"]["get_user_success_rate_distribution"]["Returns"]
}

export type Step1GraphType =
  Database["public"]["Functions"]["get_average_success_rate"]["Returns"]

export type Step2GraphType =
  Database["public"]["Functions"]["get_category_count_by_user"]["Returns"]

export type Step3GraphType =
  Database["public"]["Functions"]["get_state_counts_by_user"]["Returns"]
