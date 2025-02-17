import BaseService from '@/services/BaseService'
import { ref } from 'vue'
import type { PreEnrollment } from '@prisma/client'

const table = 'preenrollment' as const


export default class PreEnrollmentService extends BaseService<PreEnrollment> {
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

  async genericGet(collection: string, id: string) {
    try {
      const data = await this.client.from(table)
        .select('name')
        .eq('id', id)

      return data.data?.at(0)
    }
    catch (error) {
      console.error(`Erro ao listar dados da collection: ${collection} filtrando pelo id: ${id}`, error)
    }
  }

  async getPreEnrollmentByCode(uniqueCode: string) {
    try {
      const information = ref({
        preenrollment: undefined as any,
        student: undefined as any,
        course: undefined as any,
        school: undefined as any,
        series: undefined as any,
      })
      const data: { data: { studentId: string }[] } | any = await this.client.from(table)
        .select('preenrollmentcode, studentId, schoolId, courseId, seriesId, datePreenrollment, observations, status')
        .eq('preenrollmentcode', uniqueCode)

      if (data.data.length > 0) {
        information.value.preenrollment = data.data[0]
        information.value.student = await this.genericGet('student', data.data[0].studentId)
        information.value.course = await this.genericGet('course', data.data[0].courseId)
        information.value.school = await this.genericGet('school', data.data[0].schoolId)
        information.value.series = await this.genericGet('series', data.data[0].seriesId)
      }

      return information.value
    }
    catch (error) {
      console.error('Erro ao listar a pré-matrícula:', error)
      throw error
    }
  }

  async insertPreEnrollment(
    preEnrollmentData: PreEnrollment,
  ) {
    try {
      if (preEnrollmentData.id === '') {
        preEnrollmentData.id = self.crypto.randomUUID()
      }
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
          .select('preenrollmentcode')
          .eq('preenrollmentcode', uCode.value)

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
