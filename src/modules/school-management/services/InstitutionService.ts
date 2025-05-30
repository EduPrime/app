import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'institution' as const

type InstitutionTable = typeof table

export default class InstitutionService extends BaseService<InstitutionTable> {
  constructor() {
    super(table)
  }

  async getInstitutions() {
    try {
      const { data, error } = await this.client
        .from(table)
        .select(`
        id,
        name
      `)

      if (error) {
        throw error
      }
      return data
    }
    catch (error) {
      errorHandler(error, 'Error fetching institutions')
      return []
    }
  }
  
  async getInstitutionById(id: string) {
    try {
      const { data, error } = await this.client
        .from(table)
        .select(`
        id,
        name
      `)
        .eq('id', id)
        .single()

      if (error) {
        throw error
      }
      return data
    }
    catch (error) {
      errorHandler(error, 'Error fetching institution by ID')
      return null
    }
  }
}
