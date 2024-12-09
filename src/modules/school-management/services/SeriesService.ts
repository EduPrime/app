import BaseService from '@/services/BaseService'

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
        throw seriesError
      }

      // Retorna os dados das séries
      return series
    }
    catch (error) {
      console.error('Erro ao buscar séries', error)
      throw new Error('Failed to fetch series.')
    }
  }
}
