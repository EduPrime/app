import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export default class GedService {
  private supabase = createClient(supabaseUrl, supabaseKey)

  async uploadFile(file: File, bucket: string) {
    return await this.supabase.storage
      .from(bucket)
      .upload(`uploads/${file.name}`, file)
  }
}
