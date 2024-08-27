import BaseService from '@/services/BaseService'

// Tipo específico para garantir que 'institution' é uma chave válida
type InstitutionTable = 'institution'

export default class InstitutionService extends BaseService<InstitutionTable> {
  constructor() {
    super('institution') // Passando o nome da tabela para a classe base
  }
}
