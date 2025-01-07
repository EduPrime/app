import BaseService from '@/services/BaseService'
import type { Student } from '@prisma/client'


export default class StudentService extends BaseService<Student> {
  constructor() {
    super('student')
  }
}
