import type { Teacher } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'teacher' as const

export default class TeacherService extends BaseService<Teacher> {
  constructor() {
    super(table)
  }
}
