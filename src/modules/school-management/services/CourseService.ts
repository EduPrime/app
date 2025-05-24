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

  async loadCoursesByIds(courseIds: string[]): Promise<Record<string, any>> {
    try {
      const courseMap: Record<string, any> = {}

      for (const courseId of courseIds) {
        const { data, error } = await this.client
          .from(table)
          .select('*')
          .eq('id', courseId)
          .maybeSingle()

        if (!error && data) {
          courseMap[courseId] = data
        }
      }

      return courseMap
    }
    catch (error) {
      errorHandler(error, 'Erro ao carregar dados dos cursos')
      return {}
    }
  }
}
