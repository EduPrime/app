import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'series' as const

type TabelaType = typeof table

export default class SeriesService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para obter séries baseadas no ID do school
  async getSeriesBySchool(schoolId: string) {
    try {
      const { data: series, error: seriesError } = await this.client
        .from('series') // Tabela de séries
        .select('id, name')
        .eq('schoolId', schoolId)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries')
      }

      // Retorna os dados das séries
      return series
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries')
    }
  }

  async getSeriesBySchoolAndCourse(schoolId: string, courseId: string) {
    try {
      const { data: series, error: seriesError } = await this.client
        .from('series')
        .select('id, name')
        .eq('schoolId', schoolId)
        .eq('courseId', courseId)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries por escola e curso')
      }

      return series
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries por escola e curso')
    }
  }
}
