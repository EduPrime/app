import type { Tables } from '@/types/database.types'
import BaseService from '@/services/BaseService'

const table = 'school' as const

type SchoolTable = typeof table

export default class SchoolService extends BaseService<SchoolTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getSchoolCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('school') // Tabela de escolas
        .select('*', { count: 'exact', head: true }) // Conta o número de escolas ignorando os soft-deleted
        .is('deletedAt', null) // Ignora as escolas delet

      if (error)
        throw error
      return count ?? 0
    }
    catch (error) {
      console.error('Error ao contar escolas:', error)
      return 0
    }
  }

  async getClassCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('classroom') // Tabela de turmas
        .select('*', { count: 'exact', head: true }) // Conta o número de turmas ignorando as soft-deleted
        .is('deletedAt', null) // Ignora as turmas deletadas

      if (error)
        throw error
      return count ?? 0
    }
    catch (error) {
      console.error('Error ao contar turmas:', error)
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
        throw error
      return count ?? 0
    }
    catch (error) {
      console.error('Error ao contar professores:', error)
      return 0
    }
  }

  async getApprovalRate(): Promise<number> {
    try {
      const { count: totalStudents, error: totalError } = await this.client
        .from('student') // Tabela de estudantes
        .select('*', { count: 'exact', head: true }) // Conta o número de estudantes ignorando os soft-deleted

      if (totalError)
        throw totalError

      const { count: approvedStudents, error: approvedError } = await this.client
        .from('student') // Tabela de estudantes
        .select('*', { count: 'exact', head: true }) // Conta o número de estudantes ignorando os soft-deleted
        .is('deletedAt', null) // Ignora os estudantes deletados
      /*   .filter({ approved: true }) // Filtra os estudantes aprovados ou .eq({ approved: true }) */

      if (approvedError)
        throw approvedError

      const total = totalStudents ?? 0
      const approved = approvedStudents ?? 0
      return total > 0 ? Math.round((approved / total) * 100) : 0
    }
    catch (error) {
      console.error('Error ao calcular taxa de aprovação:', error)
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
        throw error
      return count ?? 0
    }
    catch (error) {
      console.error('Error ao contar estudantes:', error)
      return 0
    }
  }
}
