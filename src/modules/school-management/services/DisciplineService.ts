import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'discipline' as const

type TabelaType = typeof table

export default class DisciplineService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getAllDiscipline() {
    try {
      const { data: discipline, error: disciplineError } = await this.client
        .from(table)
        .select('*')

      if (disciplineError) {
        errorHandler(disciplineError, 'Erro ao buscar séries')
      }

      return discipline
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries')
    }
  }
}
