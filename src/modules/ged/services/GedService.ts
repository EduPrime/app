import BaseService from '@/services/BaseService'

const table = 'document'
type DocumentTable = typeof table

export default class DocumentService extends BaseService<DocumentTable> {
  constructor() {
    super(table)
  }

  /**
   * Upload a file to Supabase storage
   * @param bucketName - The name of the storage bucket
   * @param path - The path within the bucket where the file should be uploaded
   * @param file - The file object to be uploaded
   * @param options - Optional settings like cache control and upsert
   * @returns An object containing the upload data or an error
   */
  async uploadFile(
    bucketName: string,
    path: string,
    file: File,
    options?: { cacheControl?: string, upsert?: boolean },
  ): Promise<{ data: any, error: any }> {
    try {
      const { data, error } = await this.client.storage
        .from(bucketName)
        .upload(path, file, {
          cacheControl: options?.cacheControl || '3600',
          upsert: options?.upsert || false,
        })

      if (error) {
        throw error
      }

      return { data, error: null }
    }
    catch (error) {
      console.error(`Erro ao fazer upload do arquivo no bucket ${bucketName}:`, error)
      return { data: null, error }
    }
  }
}
