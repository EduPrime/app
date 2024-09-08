// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'
// TODO precisar configurar as variaveis de ambiente aqui
const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'ANON_KEY'
export const supabase = createClient(supabaseUrl, supabaseKey)
