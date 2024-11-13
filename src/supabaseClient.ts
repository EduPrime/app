import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
// TODO precisar configurar as variaveis de ambiente aqui
const supabaseUrl = 'https://hokeopsqpxnvfhczdhzc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva2VvcHNxcHhudmZoY3pkaHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NzkyNzksImV4cCI6MjA0MDI1NTI3OX0.JC5yB090108l04qPkDYL_gvDQJQX6yH8QwsIEQ58oEg'
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)
