import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'discipline' as const

type TabelaType = typeof table

export default class DisciplineService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getDisciplinesBySeries(seriesId: string) {
    try {
      const { data: seriesDisciplines, error: sdError } = await this.client
        .from('seriesDiscipline')
        .select('id, disciplineId')
        .eq('seriesId', seriesId)
        .is('deletedAt', null)

      if (sdError) {
        errorHandler(sdError, 'Erro ao buscar disciplinas da série')
        return []
      }

      if (!seriesDisciplines || seriesDisciplines.length === 0) {
        return []
      }

      const disciplineIds = seriesDisciplines.map(sd => sd.disciplineId)

      const { data: disciplines, error: disciplinesError } = await this.client
        .from('discipline')
        .select('id, name')
        .in('id', disciplineIds)
        .is('deletedAt', null)

      if (disciplinesError) {
        errorHandler(disciplinesError, 'Erro ao buscar detalhes das disciplinas')
        return []
      }

      return disciplines.map((discipline) => {
        const seriesDiscipline = seriesDisciplines.find(sd => sd.disciplineId === discipline.id)
        return {
          ...discipline,
          seriesDisciplineId: seriesDiscipline ? seriesDiscipline.id : null,
        }
      })
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar disciplinas por série')
      return []
    }
  }

  async getDisciplinesByIds(disciplineIds: string[]) {
    try {
      if (!disciplineIds || disciplineIds.length === 0) {
        return []
      }

      const { data: disciplines, error: disciplinesError } = await this.client
        .from('discipline')
        .select('id, name')
        .in('id', disciplineIds)
        .is('deletedAt', null)

      if (disciplinesError) {
        errorHandler(disciplinesError, 'Erro ao buscar detalhes das disciplinas')
        return []
      }

      return disciplines || []
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar disciplinas por IDs')
      return []
    }
  }

  async getDisciplinesByClassroom(classroomId: string, altDisciplineList: boolean, seriesId: string) {
    try {
      let disciplineIds: string[] = []

      if (altDisciplineList) {
        const { data: classroomDisciplines, error: cdError } = await this.client
          .from('classroomDiscipline')
          .select('disciplineId')
          .eq('classroomId', classroomId)
          .is('deletedAt', null)

        if (cdError) {
          errorHandler(cdError, 'Erro ao buscar disciplinas customizadas da turma')
          return []
        }

        if (classroomDisciplines && classroomDisciplines.length > 0) {
          disciplineIds = classroomDisciplines.map(cd => cd.disciplineId)
        }
      }
      else if (seriesId) {
        const { data: seriesDisciplines, error: sdError } = await this.client
          .from('seriesDiscipline')
          .select('disciplineId')
          .eq('seriesId', seriesId)
          .is('deletedAt', null)

        if (sdError) {
          errorHandler(sdError, 'Erro ao buscar disciplinas padrão da série')
          return []
        }

        if (seriesDisciplines && seriesDisciplines.length > 0) {
          disciplineIds = seriesDisciplines.map(sd => sd.disciplineId)
        }
      }

      if (disciplineIds.length > 0) {
        return await this.getDisciplinesByIds(disciplineIds)
      }

      return []
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar disciplinas da turma')
      return []
    }
  }
}
