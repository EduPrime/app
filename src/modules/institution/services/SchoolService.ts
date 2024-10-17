import type { Tables } from '@/types/database.types'
import BaseService from '@/services/BaseService'

const table = 'school' as const

type SchoolTable = typeof table

export default class SchoolService extends BaseService<SchoolTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
