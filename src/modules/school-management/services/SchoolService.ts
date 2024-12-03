import type { Tables } from '@/types/database.types'
import BaseService from '@/services/BaseService'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const table = 'School' as const

type SchoolTable = typeof table

export default class SchoolService extends BaseService<SchoolTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

/*   async getSchoolCount(): Promise<number> {
    try {
      const count = await prisma.school.count({
        where: {
          deleted_at: null,
        },
      })
      return count
    }
    catch (error) {
      console.error('Error ao contar escolas:', error)
      return 0
    }
  }

  async getClassCount(): Promise<number> {
    try {
      const count = await prisma.classroom.count({
        where: {
          deleted_at: null,
        },
      })
      return count
    }
    catch (error) {
      console.error('Error ao contar turmas:', error)
      return 0
    }
  }

  async getTeacherCount(): Promise<number> {
    try {
      const count = await prisma.teacher.count({
        where: {
          deleted_at: null,
        },
      })
      return count
    }
    catch (error) {
      console.error('Error ao contar professores:', error)
      return 0
    }
  }

  async getApprovalRate(): Promise<number> {
    try {
      const totalStudents = await prisma.student.count({
        where: {
          deleted_at: null,
        },
      })

      const approvedStudents = await prisma.student.count({
        where: {
          deleted_at: null,
          approved: true,
        },
      })

      return totalStudents > 0 ? Math.round((approvedStudents / totalStudents) * 100) : 0
    }
    catch (error) {
      console.error('Erro ao calcular taxa de aprovação:', error)
      return 0
    }
  }

  async getStudentCount(): Promise<number> {
    try {
      const count = await prisma.student.count({
        where: {
          deleted_at: null,
        },
      })
      return count
    }
    catch (error) {
      console.error('Error ao contar estudantes:', error)
      return 0
    }
  } */
}
