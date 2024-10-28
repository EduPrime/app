import BaseService from '@/services/BaseService'

const table = 'course' as const

type TabelaType = typeof table

export default class CourseService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }
}
