import BaseService from '@/services/BaseService'
import type { Classroom } from '@prisma/client'

const table = 'classroom' as const

export default class ClassroomService extends BaseService<Classroom> {
  constructor() {
    super(table)
  }
}
