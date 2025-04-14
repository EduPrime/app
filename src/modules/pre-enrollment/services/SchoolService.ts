import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'school' as const

type TabelaType = typeof table

export default class SchoolService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getSchools(): Promise<any | null> {
    try {
      const { data, error } = await this.client
        .from('school')
        .select('*')

      if (error) {
        errorHandler(error, 'Error fetching schools')
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      errorHandler(error, 'Error fetching schools')
    }
  }

  async searchSchools(searchTerm?: string) {
    try {
      let query = this.client
        .from('school')
        .select('*')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) {
        errorHandler(error, 'Error fetching schools')
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      errorHandler(error, 'Error fetching schools')
    }
  }
}
