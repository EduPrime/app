/* eslint-disable style/quotes */
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { FileAttachment } from '../data/files'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export default class GedService {
  private supabase: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
  )

  async uploadFile(file: File, bucket: string) {
    return await this.supabase.storage
      .from(bucket)
      .upload(`uploads/${file.name}`, file)
  }

  async saveFileDetails(file: FileAttachment) {
    return await this.supabase.from('document').insert(file)
  }

  async getFiles() {
    // this.signin() //** Sign in temparory for testing, add this user manually on dashboard to allow signin */
    return await this.supabase.from('document').select()
  }

  async signin() {
    return this.supabase.auth.signInWithPassword({
      email: "",
      password: "", /** Add email pass here, to signin and uncomment above to allow calling signin action */
    })
  }
}
