import BaseService from '@/services/BaseService'

const table = 'pre_enrollment' as const

type TabelaType = typeof table

export default class Pre_enrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
