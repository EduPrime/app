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
      // Primeiro, obtemos os cursos associados à escola
      const { data: courses, error: coursesError } = await this.client
        .from('course')
        .select('id')
        .eq('schoolId', schoolId)
        .is('deletedAt', null)

      if (coursesError) {
        errorHandler(coursesError, 'Erro ao buscar cursos da escola')
        return []
      }

      if (!courses || courses.length === 0) {
        // Se não há cursos, não há séries
        return []
      }

      // Extraímos os IDs dos cursos
      const courseIds = courses.map(course => course.id)

      // Agora buscamos as séries associadas a esses cursos
      const { data: series, error: seriesError } = await this.client
        .from('series')
        .select('id, name, courseId')
        .in('courseId', courseIds)
        .is('deletedAt', null)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries')
        return []
      }

      // Retorna os dados das séries
      return series
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries')
      return []
    }
  }
}
