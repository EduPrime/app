import type { Series } from '@prisma/client'
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

const table = 'series' as const // Modifique para sua tabela

export default class SeriesService extends BaseService<Series> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
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

  async listSeriesAndSchools(classes: string[]) {
    const { data, error } = await this.client
      .from('classroom')
      .select('*, series:seriesId (name), school:schoolId (name)')
      .in('id', classes)

    if (error) {
      errorHandler(error, 'Erro ao buscar séries e escolas')
    }
    if (!data) {
      throw new Error('Nenhuma nota encontrada')
    }

    const schoolMap = new Map<string, { school: string, series: string[] }>()

    data.forEach((item) => {
      const schoolName = item.school?.name
      const seriesName = item.series?.name

      if (schoolName && seriesName) {
        if (!schoolMap.has(schoolName)) {
          schoolMap.set(schoolName, { school: schoolName, series: [] })
        }

        const schoolEntry = schoolMap.get(schoolName)
        if (schoolEntry && !schoolEntry.series.includes(seriesName)) {
          schoolEntry.series.push(seriesName)
        }
      }
    })
    return Array.from(schoolMap.values())
  }
}
