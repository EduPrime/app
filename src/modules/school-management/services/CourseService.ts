import type { Course } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'course' as const

export default class CourseService extends BaseService<Course> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  // Método para obter cursos baseados no ID da escola
  async getCoursesBySchool(schoolId: string) {
    try {
      const { data: courses, error: coursesError } = await this.client
        .from(table)
        .select('id, name')
        .eq('schoolId', schoolId)

      if (coursesError) {
        errorHandler(coursesError, 'Erro ao buscar cursos')
      }

      return courses
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar cursos')
    }
  }
}
