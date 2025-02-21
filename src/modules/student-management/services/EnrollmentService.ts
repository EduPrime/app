import BaseService from '@/services/BaseService'
import type { Enrollment } from '@prisma/client'

const table = 'enrollment'

export default class EnrollmentService extends BaseService<Enrollment> {
  constructor() {
    super(table)
  }

  // Método para verificar se o código de matrícula é único
  isUniqueEnrollmentCode = async (enrollmentCode: string): Promise<boolean> => {
    try {
      const existingEnrollments = await this.getAll() // Obtém todas as matrículas

      // Verifica se algum código de matrícula coincide com o código fornecido
      if (!existingEnrollments) {
        return false
      }
      return !existingEnrollments.some(
        (enrollment: any) => enrollment.enrollmentCode === enrollmentCode,
      )
    }
    catch (error) {
      console.error('Erro ao verificar unicidade do código de matrícula:', error)
      return false // Retorna false em caso de erro
    }
  }

  async createEnrollment(enrollmentData: any) {
    try {
      const data = await this.client.from(table).insert(enrollmentData)
    }
    catch (error: any) {
      console.log("Não foi possível criar a matrícula", error.message)
    }
  }
}
