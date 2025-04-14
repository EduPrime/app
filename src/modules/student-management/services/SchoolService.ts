import type { School } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'school'

export default class SchoolService extends BaseService<School> {
  constructor() {
    super(table)
  }

  async getSchool(schoolId: string | null) {
    try {
      const { data } = await this.client.from(table).select(`
            name,
            id
        `).eq('id', schoolId).single()
      return (data)
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar escola')
    }
  }
}
