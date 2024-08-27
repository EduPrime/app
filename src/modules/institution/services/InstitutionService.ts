import BaseService from '@/services/BaseService'

const table = 'institution' as const

type InstitutionTable = typeof table

export default class InstitutionService extends BaseService<InstitutionTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
