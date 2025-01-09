import BaseService from '@/services/BaseService'
import type { Enrollment } from '@prisma/client'


export default class EnrollmentService extends BaseService<Enrollment> {
  constructor() {
    super('enrollment')
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
}
