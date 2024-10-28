import BaseService from '@/services/BaseService'

const table = 'school' as const

type TabelaType = typeof table

export default class SchoolService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
