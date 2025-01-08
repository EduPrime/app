import BaseService from '@/services/BaseService'
import type { Institution } from '@prisma/client'

export default class InstitutionService extends BaseService<Institution> {
  constructor() {
    super('institution') // Passando o nome da tabela para a classe base
  }
}
