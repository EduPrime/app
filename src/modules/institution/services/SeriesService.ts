import BaseService from '@/services/BaseService'
import type { Series } from '@prisma/client'


export default class SeriesService extends BaseService<Series> {
  constructor() {
    super('series') // Passando o nome da tabela para a classe base
  }
}
