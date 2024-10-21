import BaseService from '@/services/BaseService'

const table = 'teacher' as const

type TeacherTable = typeof table

export default class TeacherService extends BaseService<TeacherTable> {
  constructor() {
    super(table)
  }
}
