import BaseService from '@/services/BaseService'
import { ref } from 'vue'

const table = 'pre_enrollment' as const

interface PreEnrollmentType {
  course_id: string
  created_at?: string | undefined
  date_enrollment: string
  deleted_at?: string | null | undefined
  id?: string | undefined
  observations?: string | null | undefined
  pre_enrollment_code?: string | null | undefined
  school_id: string
  series_id: string
  situation?: 'Transferido' | 'Pendente' | 'Cursando' | 'Aprovado' | 'Aprovado pelo Conselho' | 'Aprovado com Dependência' | 'Reprovado' | 'Abandono' | 'Falecido' | null | undefined
  status?: 'Ativo' | 'Inativo' | 'Graduado' | 'Suspenso' | 'Transferido' | null | undefined
  student_id: string
  updated_at?: string | null | undefined

}

type TabelaType = typeof table

export default class PreEnrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getPreEnrollments() {
    try {
      const data = await this.client.from(table).select('*')
      return data
    }
    catch (error) {
      console.error('Erro ao listar as pré-matrículas:', error)
      throw error
    }
  }

  async insertPreEnrollment(
    preEnrollmentData: PreEnrollmentType,
  ) {
    try {
      const data = await this.client.from(table).insert(preEnrollmentData).select('*')

      return data
    }
    catch (error) {
      console.error('Erro ao inserir a pré-matrícula:', error)
      throw error
    }
  }

  async generateUnicPreEnrollmentCode(preEnrollmentCode = this.generateRandomPreEnrollmentCode()): Promise<string> {
    const data = ref()
    const uCode = ref(preEnrollmentCode)
    try {
      do {
        data.value = await this.client.from(table)
          .select('pre_enrollment_code')
          .eq('pre_enrollment_code', uCode.value)

        if (data.value.data && data.value.data.length > 0) {
          uCode.value = this.generateRandomPreEnrollmentCode()
        }
      } while (data.value.data && data.value.data.length > 0)

      return uCode.value
    }
    catch (error) {
      console.error('Erro ao pegar o código de pré-matrícula:', error)
      throw error
    }
  }

  generateRandomPreEnrollmentCode(): string {
    const length = Math.floor(Math.random() * 3) + 6 // Gera um número entre 6 e 8
    const randomDigits = Math.random().toString().slice(2, 2 + length).padStart(6, '0')
    return `pre-${randomDigits}`
  }
}

// async getPreEnrollmentCode(preEnrollmentCode = this.generateRandomPreEnrollmentCode()) {
//   try {
//     const data = await this.client.from(table)
//       .select('pre_enrollment_code')
//       .eq('pre_enrollment_code', preEnrollmentCode)

//     console.log('Resultado', data.data)

//     return data
//   }
//   catch (error) {
//     console.error('Erro ao pegar o código de pré-matrícula:', error)
//     throw error
//   }
// }
