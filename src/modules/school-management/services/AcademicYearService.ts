import BaseService from '@/services/BaseService'

const table = 'academic_year' as const

type AcademicYearTable = typeof table

export default class AcademicYearService extends BaseService<AcademicYearTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
