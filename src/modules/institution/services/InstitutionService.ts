import type { Institution } from '../types/Institution'
import BaseService from '@/services/BaseService'

export default class InstitutionService extends BaseService<Institution> {
  constructor() {
    super('institution') // Passando o nome da tabela para a classe base
  }

  // Métodos específicos para a tabela Institution podem ser adicionados aqui
}
