import BaseService from '@/services/BaseService'

const table = 'course_series_discipline' as const

type TabelaType = typeof table

export default class Course_series_disciplineService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para obter séries baseadas no ID do curso
  async getSeriesByCourse(courseId: string) {
    try {
      // Consulta para obter os series_id baseados no course_id da tabela course_series_discipline
      const courseSeriesDisciplines = await this.filter('course_id', courseId)

      // Se não encontrar nenhuma série relacionada, retornar vazio
      if (!courseSeriesDisciplines || courseSeriesDisciplines.length === 0) {
        return []
      }

      // Extrair os IDs das séries
      const seriesIds = courseSeriesDisciplines.map((csd: any) => csd.series_id)

      // Buscar os detalhes das séries baseados nos series_ids extraídos
      const series = await this.filter('id', seriesIds)
      return series
    }
    catch (error) {
      console.error('Erro ao buscar séries para o curso:', error)
      throw new Error('Failed to fetch series for the selected course.')
    }
  }
}
