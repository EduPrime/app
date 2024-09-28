import BaseService from '@/services/BaseService'

const table = 'enrollment' as const

type TabelaType = typeof table

export default class EnrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
