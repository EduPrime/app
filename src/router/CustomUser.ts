import type { User as SupabaseUser } from '@supabase/supabase-js'

interface CustomUserMetadata {
  email: string
  email_verified: boolean
  phone_verified: boolean
  role: string
  sub: string
  [key: string]: any
}

export default interface CustomUser extends SupabaseUser {
  user_metadata: CustomUserMetadata
}
