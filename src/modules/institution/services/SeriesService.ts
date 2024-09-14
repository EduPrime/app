import BaseService from '@/services/BaseService'

const table = 'series' as const

type SeriesTable = typeof table

export default class SeriesService extends BaseService<SeriesTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
