import { PostgrestClient } from '@supabase/postgrest-js'

const API_URL = import.meta.env.VITE_API_URL
export const postgrest = new PostgrestClient(API_URL)
