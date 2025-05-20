import type { Course } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'course' as const

export default class CourseService extends BaseService<Course> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getAllCourses() {
    try {
      const { data: course, error: courseError } = await this.client
        .from(table)
        .select('*')

      if (courseError) {
        errorHandler(courseError, 'Erro ao buscar séries')
      }

      return course
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar séries')
    }
  }
}
