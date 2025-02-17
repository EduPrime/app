import BaseService from '@/services/BaseService'
import type { Institution } from '@prisma/client'

const table = 'institution' as const


export default class InstitutionService extends BaseService<Institution> {
  constructor() {
    super(table)
  }

  async getInstitutionId() {
    try {
      const { data, error } = await this.client.from(table).select('*')
      if (error) {
        throw error
      }
      return data ? data[0]['id'] : null
    }
    catch (error) {
      console.error('Erro ao listar a instituição:', error)
      throw error
    }
  }
}
