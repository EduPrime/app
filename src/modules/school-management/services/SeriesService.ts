import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface SeriesToSave {
  name: string
  courseId: string
  description?: string
  tenantId?: string | null
  userCreated?: string | null
  createdAt: string
  deletedAt: string | null
  updatedAt: string | null
  updatedBy: string | null
  institutionId: string
}

interface SeriesDisciplines {
  seriesId: string
  disciplineId: string
  year: number
  workload: number
  createdAt: string
  updatedAt: string | null
  updatedBy: string | null
}

const table = 'series' as const

type TabelaType = typeof table

export default class SeriesService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para obter séries baseadas no ID do school
  async getAllSeries() {
    try {
      const { data: series, error: seriesError } = await this.client
        .from(table)
        .select('*')

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

  async getSeriesDisciplines(serieId: string) {
    try {
      const { data, error } = await this.client
        .from('seriesDisciplines')
        .select('*')
        .eq('seriesId', serieId)

      if (error) {
        errorHandler(error, 'Erro ao buscar disciplinas da série')
      }

      return data as SeriesDisciplines[]
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar disciplinas da série')
    }
  }

  async upsertSeriesWithDisciplines(series: SeriesToSave, disciplines: SeriesDisciplines[]) {
    try {
      const { data: seriesData, error: seriesError } = await this.client
        .from('series')
        .upsert(series, { onConflict: 'id' })
        .select('*')

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao inserir ou atualizar a série')
        return
      }
      if (!seriesData || seriesData.length === 0) {
        throw new Error('Erro ao obter os dados da série após o upsert')
      }

      const seriesId = seriesData?.[0]?.id
      if (!seriesId) {
        throw new Error('Erro ao obter o ID da série após o upsert')
      }

      const disciplinesToUpsert = disciplines.map(discipline => ({
        ...discipline,
        seriesId, // Adiciona o ID da série retornado
      }))

      const { data: disciplinesData, error: disciplinesError } = await this.client
        .from('seriesDiscipline')
        .upsert(disciplinesToUpsert, { onConflict: 'id' })

      if (disciplinesError) {
        errorHandler(disciplinesError, 'Erro ao inserir ou atualizar disciplinas da série')
        return
      }

      return { series: seriesData, disciplines: disciplinesData }
    }
    catch (error) {
      errorHandler(error, 'Erro ao inserir ou atualizar série e disciplinas')
    }
  }
}
