import BaseService from '@/services/BaseService'

const table = 'classroom' as const

type TabelaType = typeof table

export default class ClassroomService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
