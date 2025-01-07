import BaseService from '@/services/BaseService'
import type { AcademicYear } from '@prisma/client'

export default class AcademicYearService extends BaseService<AcademicYear> {
  constructor() {
    super('academicyear') // Passando o nome da tabela para a classe base
  }
}
