import type { Schedule } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'schedule' as const

export default class ScheduleService extends BaseService<Schedule> {
  constructor() {
    super(table)
  }

  async countSchools(teacherId: string) {
    const { count, error } = await this.client
      .from('schedule')
      .select('count(distinct schoolId)')
      .eq('teacherId', teacherId)

    if (error) {
      throw new Error(`Erro ao contar o número de escolas: ${error.message}`)
    }
    if (!count) {
      throw new Error('Nenhuma escola encontrada')
    }

    return count
  }

  async countClassrooms(teacherId: string) {
    const { count, error } = await this.client
      .from('schedule')
      .select('count(distinct classroomId)')
      .eq('teacherId', teacherId)

    if (error) {
      throw new Error(`Erro ao contar o número de turmas: ${error.message}`)
    }
    if (!count) {
      throw new Error('Nenhuma turma encontrada')
    }

    return count
  }

  async listClassrooms(teacherId: string) {
    const { data, error }: { data: { classroomId: string }[] | null, error: any } = await this.client
      .from('schedule')
      .select('*,classroomId')
      .eq('teacherId', teacherId)

    if (error) {
      throw new Error(`Erro ao buscar turmas: ${error.message}`)
    }
    if (!data || data.length === 0) {
      throw new Error('Nenhuma turma encontrada')
    }

    const classArray: string[] = []
    data.forEach(item => classArray.push(item.classroomId))
    const classSet = new Set(classArray)
    return classSet
  }

  async discipline(disciplineId: string) {
    const { data, error } = await this.client
      .from('discipline')
      .select('*')
      .eq('id', disciplineId)

    if (error) {
      throw new Error(`Erro ao buscar nome da disciplina: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhuma disciplina encontrada')
    }

    return data
  }

  async listDiscipline(teacherId: string, classroomId: string) {
    const { data, error }: { data: { disciplineId: string, disciplineName: string }[] | null, error: any } = await this.client
      .from('schedule')
      .select('disciplineId')
      .eq('teacherId', teacherId)
      .eq('classroomId', classroomId)

    if (error) {
      throw new Error(`Erro ao buscar disciplinas: ${error.message}`)
    }
    if (!data || data.length === 0) {
      throw new Error('Nenhuma disciplina encontrada')
    }
    const disciplineSet = new Set<string>()
    const disciplines = await Promise.all(data.map(async (item) => {
      if (!disciplineSet.has(item.disciplineId)) {
        disciplineSet.add(item.disciplineId)
        const disciplineData = await this.discipline(item.disciplineId)
        return {
          disciplineId: item.disciplineId,
          disciplineName: disciplineData[0]?.name || 'Nome não encontrado',
        }
      }
    }))

    // Remove undefined values from the array
    const uniqueDisciplines = disciplines.filter(discipline => discipline !== undefined)

    return uniqueDisciplines
  }

  async getSchedule(teacherId: string) {
    const { data, error } = await this.client
      .from('schedule')
      .select(`weekday`,
      )
      .eq('teacherId', teacherId)

    if (error) {
      throw new Error(`Erro ao buscar dias válidos: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhum dia válido encontrado')
    }

    return data
  }
}
