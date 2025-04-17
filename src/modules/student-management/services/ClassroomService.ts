import type { Classroom } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'classroom'

export default class EnrollmentService extends BaseService<Classroom> {
  constructor() {
    super(table)
  }

  async updateTotalStudents(id: any, pcd: boolean) {
    try {
      const total = await this.client.from(table)
        .select('totalStudents, pcdStudents, maxStudents, exceededStudents')
        .eq('id', id)
        .single()

      if (total.error) {
        errorHandler(total.error, 'Erro ao buscar total de estudantes')
      }

      const novoTotal = (total.data?.totalStudents ?? 0) + 1
      const totalPcd = (total.data?.pcdStudents ?? 0) + 1
      if (novoTotal > total.data?.maxStudents) {
        const novoExceed = (total.data?.exceededStudents ?? 0) + 1
        await this.client.from(table)
          .update({ exceededStudents: novoExceed })
          .eq('id', id)
      }
      if (pcd) {
        await this.client.from(table)
          .update({ totalStudents: novoTotal, pcdStudents: totalPcd })
          .eq('id', id)
      }
      else {
        await this.client.from(table)
          .update({ totalStudents: novoTotal })
          .eq('id', id)
      }
    }
    catch (error: any) {
      errorHandler(error, 'Erro ao atualizar total de estudantes')
    }
  }

  async getClasses(seriesId: string, schoolId: string) {
    let query = this.client.from(table).select(`
          *
      `)

    query = query.eq('seriesId', seriesId).eq('schoolId', schoolId)

    const { data, error } = await query

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas')
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }
    return data
  }
}
