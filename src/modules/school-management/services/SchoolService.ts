import type { School } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

export default class SchoolService extends BaseService<School> {
  constructor() {
    super('school') // Passando o nome da tabela para a classe base
  }

  async getSchoolCount() {
    try {
      const { count, error } = await this.client
        .from('school') // Tabela de escolas
        .select('*', { count: 'exact', head: true }) // Conta o número de escolas ignorando os soft-deleted
        .is('deletedAt', null) // Ignora as escolas delet

      if (error)
        errorHandler(error, 'Erro ao contar escolas')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar escolas')
    }
  }

  async getClassCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('classroom') // Tabela de turmas
        .select('*', { count: 'exact', head: true }) // Conta o número de turmas ignorando as soft-deleted
        .is('deletedAt', null) // Ignora as turmas deletadas

      if (error)
        errorHandler(error, 'Erro ao contar turmas')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar turmas')
      return 0
    }
  }

  async getTeacherCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('teacher') // Tabela de professores
        .select('*', { count: 'exact', head: true }) // Conta o número de professores ignorando os soft-deleted
        .is('deletedAt', null) // Ignora os professores deletados

      if (error)
        errorHandler(error, 'Erro ao contar professores')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar professores')
      return 0
    }
  }

  async getApprovalRate(): Promise<number> {
    try {
      const { count: totalStudents, error: totalError } = await this.client
        .from('student') // Tabela de estudantes
        .select('*', { count: 'exact', head: true }) // Conta o número de estudantes ignorando os soft-deleted

      if (totalError)
        errorHandler(totalError, 'Erro ao contar estudantes')

      const { count: approvedStudents, error: approvedError } = await this.client
        .from('student') // Tabela de estudantes
        .select('*', { count: 'exact', head: true }) // Conta o número de estudantes ignorando os soft-deleted
        .is('deletedAt', null) // Ignora os estudantes deletados
      /*   .filter({ approved: true }) // Filtra os estudantes aprovados ou .eq({ approved: true }) */

      if (approvedError)
        errorHandler(approvedError, 'Erro ao contar estudantes aprovados')

      const total = totalStudents ?? 0
      const approved = approvedStudents ?? 0
      return total > 0 ? Math.round((approved / total) * 100) : 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao calcular taxa de aprovação')
      return 0
    }
  }

  async getStudentCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('student') // Tabela de estudantes
        .select('*', { count: 'exact', head: true }) // Conta o número de estudantes ignorando os soft-deleted
        .is('deletedAt', null) // Ignora os estudantes deletados

      if (error)
        errorHandler(error, 'Erro ao contar estudantes')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar estudantes')
      return 0
    }
  }
  async getAvailableSchools(): Promise<School[]> {
    try {
      const { data, error } = await this.client
        .from('school')
        .select('*')
        .is('deletedAt', null)
        .order('name')

      if (error) {
        errorHandler(error, 'Erro ao buscar escolas disponíveis')
        return []
      }

      return data as School[]
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar escolas disponíveis')
      return []
    }
  }
}
