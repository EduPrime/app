import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface SeriesToSave {
  id?: string
  name: string
  courseId: string
  description?: string
  workload?: number
  ageRangeMin: number | null
  ageRangeMax: number | null
  standardAge: number | null
  schoolDays: number
  tenantId?: string | null
  userCreated?: string | null
  createdAt: string | null
  deletedAt: string | null
  updatedAt: string | null
  updatedBy: string | null
  institutionId: string
}

interface SeriesDisciplines {
  id?: string
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
        .is('deletedAt', null)

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
        .is('deletedAt', null)

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
      // 1. Garantir que o campo `id` seja válido
      if (series.id === '') {
        delete series.id // Remove o campo `id` se for uma string vazia
      }

      // 2. Inserir ou atualizar a série
      const { data: seriesData, error: seriesError } = await this.client
        .from('series')
        .upsert(series, { onConflict: 'id' })
        .select('*')

      if (seriesError) {
        throw new Error(`Erro ao inserir ou atualizar a série: ${seriesError.message}`)
      }

      if (!seriesData || seriesData.length === 0) {
        throw new Error('Erro ao obter os dados da série após o upsert')
      }

      const seriesId = seriesData[0]?.id
      if (!seriesId) {
        throw new Error('Erro ao obter o ID da série após o upsert')
      }
      // 3. Buscar disciplinas existentes para a série
      const { data: existingDisciplines, error: fetchError } = await this.client
        .from('seriesDiscipline')
        .select('*')
        .eq('seriesId', seriesId)
        .is('deletedAt', null)

      if (fetchError) {
        throw new Error(`Erro ao buscar disciplinas existentes da série: ${fetchError.message}`)
      }

      // 4. Preparar disciplinas para inserção, atualização e exclusão lógica
      const disciplinesToInsert = []
      const disciplinesToUpdate = []

      for (const discipline of disciplines) {
        const existingDiscipline = existingDisciplines?.find(
          d => d.disciplineId === discipline.disciplineId && d.seriesId === seriesId,
        )

        if (existingDiscipline) {
        // Atualizar disciplina existente
          disciplinesToUpdate.push({
            id: existingDiscipline.id,
            seriesId,
            disciplineId: discipline.disciplineId,
            year: discipline.year,
            workload: discipline.workload,
            updatedAt: new Date().toISOString(),
          })
        }
        else {
        // Criar nova linha se não existir
          disciplinesToInsert.push({
            ...discipline,
            seriesId,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            deletedAt: null,
          })
        }
      }

      // Identificar disciplinas removidas (não enviadas no array)
      const disciplineIdsToDelete = existingDisciplines
        .filter(existing => !disciplines.some(
          d => d.disciplineId === existing.disciplineId && d.seriesId === existing.seriesId,
        ))
        .map(d => d.id)

      // 5. Atualizar disciplinas existentes
      if (disciplinesToUpdate.length > 0) {
        const { error: updateError } = await this.client
          .from('seriesDiscipline')
          .upsert(disciplinesToUpdate, { onConflict: 'id' })

        if (updateError) {
          throw new Error(`Erro ao atualizar disciplinas existentes: ${updateError.message}`)
        }
      }

      // 6. Inserir novas disciplinas
      if (disciplinesToInsert.length > 0) {
        const { error: insertError } = await this.client
          .from('seriesDiscipline')
          .insert(disciplinesToInsert)

        if (insertError) {
          throw new Error(`Erro ao inserir novas disciplinas: ${insertError.message}`)
        }
      }

      // 7. Marcar disciplinas removidas como excluídas
      if (disciplineIdsToDelete.length > 0) {
        const now = new Date().toISOString()
        const { error: deleteError } = await this.client
          .from('seriesDiscipline')
          .update({ deletedAt: now })
          .in('id', disciplineIdsToDelete)

        if (deleteError) {
          throw new Error(`Erro ao marcar disciplinas como excluídas: ${deleteError.message}`)
        }
      }

      return { series: seriesData, disciplines: [...disciplinesToInsert, ...disciplinesToUpdate] }
    }
    catch (error) {
      if (error instanceof Error) {
        throw new TypeError(`Erro ao inserir ou atualizar série e disciplinas: ${error.message}`)
      }
      else {
        throw new TypeError('Erro ao inserir ou atualizar série e disciplinas: Erro desconhecido')
      }
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
                discipline:disciplineId (name)
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
                ...(typeof d === 'object' && d !== null ? d : {}),
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
            discipline:disciplineId (name)
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
            ...(typeof d === 'object' && d !== null ? d : {}),
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
