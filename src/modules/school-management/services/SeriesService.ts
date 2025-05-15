import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface SeriesToSave {
  name: string
  courseId: string
  description?: string
  workload?: number
  ageRangeMin: number
  ageRangeMax: number
  standardAge: number
  schoolDays: number
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

  async getAllSeriesWithDetails() {
    try {
      const { data: seriesData, error: seriesError } = await this.client
        .from('series')
        .select(`
          *,
          course:courseId (name),
          institution:institutionId (name)
        `)
        .is('deletedAt', null)

      if (seriesError) {
        errorHandler(seriesError, 'Erro ao buscar séries com detalhes')
        return []
      }

      if (!seriesData || seriesData.length === 0) {
        return []
      }

      const seriesWithDetails = await Promise.all(
        seriesData.map(async (series) => {
          try {
            const { data: disciplines, error: disciplinesError } = await this.client
              .from('seriesDiscipline')
              .select(`
                *,
                discipline:disciplineId (name) -- Faz o join com a tabela de disciplinas para obter o nome
              `)
              .eq('seriesId', series.id)
              .is('deletedAt', null)

            if (disciplinesError) {
              errorHandler(disciplinesError, `Erro ao buscar disciplinas para a série ${series.id}`)
              return { ...series, disciplines: [] }
            }

            return {
              ...series,
              courseName: series.course?.name || 'Curso não informado',
              institutionName: series.institution?.name || 'Instituição não informada',
              disciplines: (disciplines || []).map(d => ({
                ...d,
                disciplineName: d.discipline?.name || 'Disciplina não informada',
              })),
            }
          }
          catch (error) {
            errorHandler(error, `Erro ao processar disciplinas para a série ${series.id}`)
            return { ...series, disciplines: [] }
          }
        }),
      )

      return seriesWithDetails
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries com detalhes')
      return []
    }
  }

  async getSeriesWithDetailsById(seriesId: string) {
    try {
      // 1. Buscar a série pelo ID com o nome do curso e instituição
      const { data: seriesData, error: seriesError } = await this.client
        .from('series')
        .select(`
          *,
          course:courseId (name),
          institution:institutionId (name)
        `)
        .eq('id', seriesId)
        .is('deletedAt', null)

      if (seriesError) {
        errorHandler(seriesError, `Erro ao buscar a série com ID ${seriesId}`)
        return null
      }

      if (!seriesData || seriesData.length === 0) {
        return null
      }

      const series = seriesData[0]

      // 2. Buscar as disciplinas associadas à série
      try {
        const { data: disciplines, error: disciplinesError } = await this.client
          .from('seriesDiscipline')
          .select(`
            *,
            discipline:disciplineId (name) -- Faz o join com a tabela de disciplinas para obter o nome
          `)
          .eq('seriesId', seriesId)
          .is('deletedAt', null)

        if (disciplinesError) {
          errorHandler(disciplinesError, `Erro ao buscar disciplinas para a série ${seriesId}`)
          return {
            ...series,
            disciplines: [],
          }
        }

        return {
          ...series,
          courseName: series.course?.name || 'Curso não informado',
          institutionName: series.institution?.name || 'Instituição não informada',
          disciplines: (disciplines || []).map(d => ({
            ...d,
            disciplineName: d.discipline?.name || 'Disciplina não informada',
          })),
        }
      }
      catch (error) {
        errorHandler(error, `Erro ao processar disciplinas para a série ${seriesId}`)
        return {
          ...series,
          disciplines: [],
        }
      }
    }
    catch (error) {
      errorHandler(error, `Erro ao buscar a série com ID ${seriesId}`)
      return null
    }
  }

  async softDeleteSeries(seriesId: string, userId?: string) {
    if (!seriesId) {
      errorHandler({ message: 'ID da série não fornecido' }, 'Erro ao apagar série')
      return []
    }

    const now = new Date().toISOString()
    const updateFields: Record<string, any> = {
      deletedAt: now,
      updatedAt: now,
    }

    if (userId) {
      updateFields.updatedBy = userId
    }

    // 1. Atualizar a série para exclusão lógica
    const { data: seriesData, error: seriesError } = await this.client
      .from('series')
      .update(updateFields)
      .eq('id', seriesId)
      .is('deletedAt', null)

    if (seriesError) {
      errorHandler(seriesError, 'Erro ao apagar série')
      return []
    }

    // 2. Excluir os relacionamentos na tabela seriesDiscipline
    const { data: disciplinesData, error: disciplinesError } = await this.client
      .from('seriesDiscipline')
      .update(updateFields)
      .eq('seriesId', seriesId)
      .is('deletedAt', null)

    if (disciplinesError) {
      errorHandler(disciplinesError, 'Erro ao apagar relacionamentos de disciplinas da série')
      return []
    }

    return { series: seriesData, disciplines: disciplinesData }
  }
}
