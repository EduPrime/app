import type { PreEnrollment } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'
import { ref } from 'vue'

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
      errorHandler(error, 'Erro ao listar as pré-matrículas')
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
      errorHandler(error, 'Erro ao listar o nome')
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
      errorHandler(error, 'Erro ao listar as pré-matrículas')
    }
  }

  async insertPreEnrollment(
    preEnrollmentData: any,
  ) {
    try {
      if (preEnrollmentData.id === '') {
        preEnrollmentData.id = globalThis.crypto.randomUUID()
      }
      const data = await this.client.from(table).insert(preEnrollmentData).select('*')

      return data
    }
    catch (error) {
      errorHandler(error, 'Erro ao inserir pré-matrícula')
    }
  }

  async generateUnicPreEnrollmentCode(preEnrollmentCode = this.generateRandomPreEnrollmentCode()) {
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
      errorHandler(error, 'Erro ao gerar código de pré-matrícula')
    }
  }

  generateRandomPreEnrollmentCode(): string {
    const length = Math.floor(Math.random() * 3) + 6 // Gera um número entre 6 e 8
    const randomDigits = Math.random().toString().slice(2, 2 + length).padStart(6, '0')
    return `pre-${randomDigits}`
  }
}
