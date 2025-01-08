import type { Course } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'course' as const

export default class CourseService extends BaseService<Course> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
