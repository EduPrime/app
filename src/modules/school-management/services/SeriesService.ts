import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'series' as const

type TabelaType = typeof table

export default class SeriesService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getSeriesBySchool(schoolId: string) {
    try {
      const { data: series, error: seriesError } = await this.client
        .from('series')
        .select('id, name')
        .eq('schoolId', schoolId)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries')
      }

      return series
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries')
    }
  }

  async getSeriesByCourse(courseId: string) {
    try {
      const { data: series, error: seriesError } = await this.client
        .from('series')
        .select('id, name')
        .eq('courseId', courseId)
        .is('deletedAt', null)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries por curso')
      }

      return series
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries por curso')
    }
  }
}
