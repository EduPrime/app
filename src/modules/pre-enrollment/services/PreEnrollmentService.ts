import BaseService from '@/services/BaseService'

const table = 'pre_enrollment' as const

type TabelaType = typeof table

export default class PreEnrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getPreEnrollments() {
    try {
      const data = await this.client.from(table).select('*')
      return data
    }
    catch (error) {
      console.error('Erro ao listar as pré-matrículas:', error)
      throw error
    }
  }
}
