import BaseService from '@/services/BaseService'

const table = 'enrollment' as const

type TabelaType = typeof table

export default class EnrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para verificar se o código de matrícula é único
  isUniqueEnrollmentCode = async (enrollmentCode: string): Promise<boolean> => {
    try {
      const existingEnrollments = await this.getAll() // Obtém todas as matrículas

      // Verifica se algum código de matrícula coincide com o código fornecido
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
