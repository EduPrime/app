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
      const { data: courseSeriesDisciplines, error } = await this.client
        .from('course_series_discipline') // Tabela de relacionamento
        .select('series_id') // Seleciona o series_id
        .eq('course_id', courseId) // Filtra pelo course_id selecionado

      if (error) {
        throw error
      }

      // Se não encontrar nenhuma série relacionada, retornar vazio
      if (!courseSeriesDisciplines || courseSeriesDisciplines.length === 0) {
        return []
      }

      // Extrair os IDs das séries
      const seriesIds = courseSeriesDisciplines.map(csd => csd.series_id)

      // Buscar os detalhes das séries baseados nos series_ids extraídos
      const { data: series, error: seriesError } = await this.client
        .from('series') // Tabela de séries
        .select('id, name') // Seleciona o ID e o nome das séries
        .in('id', seriesIds) // Filtra pelos series_ids

      if (seriesError) {
        throw seriesError
      }

      // Retorna os dados das séries
      return series
    }
    catch (error) {
      console.error('Erro ao buscar séries para o curso:', error)
      throw new Error('Failed to fetch series for the selected course.')
    }
  }
}
