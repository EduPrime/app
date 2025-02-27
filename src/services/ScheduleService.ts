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

    console.log('Quadro de horário', data)

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
