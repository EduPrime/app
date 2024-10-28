import BaseService from '@/services/BaseService'

const table = 'school_course' as const

type TabelaType = typeof table

export default class School_courseService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
