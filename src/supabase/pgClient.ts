const { Client } = require("pg")

export function createPGClient() {
  return new Client({
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_CONNECTION_URL!,
  })
}
