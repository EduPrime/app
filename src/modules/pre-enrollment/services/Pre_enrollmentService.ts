import type { PreEnrollment } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'pre_enrollment' as const

export default class Pre_enrollmentService extends BaseService<PreEnrollment> {
  constructor() {
    super(table)
  }
}
