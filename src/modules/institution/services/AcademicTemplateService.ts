import BaseService from '@/services/BaseService'

const table = 'academic_year_template' as const

type AcademicTemplateTable = typeof table

export default class AcademicTemplateService extends BaseService<AcademicTemplateTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
