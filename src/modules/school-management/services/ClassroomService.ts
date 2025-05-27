import type { Classroom } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'classroom' as const

export default class ClassroomService extends BaseService<Classroom> {
  constructor() {
    super(table)
  }
}
