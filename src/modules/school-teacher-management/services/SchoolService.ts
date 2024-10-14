import type { Tables } from '@/types/database.types'
import BaseService from '@/services/BaseService'

const table = 'school' as const

type SchoolTable = typeof table

export default class SchoolService extends BaseService<SchoolTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  /**
   * Fetch courses and series associated with a specific school ID.
   * @param schoolId - The ID of the school to fetch related courses and series
   * @returns An object containing arrays of courses and series or null if not found
   */
  async getCoursesAndSeriesBySchoolId(schoolId: string): Promise<{
    courses: Tables<'course'>[] | null
    series: Tables<'series'>[] | null
  } | null> {
    try {
      // Fetch courses related to the school
      const { data: courses, error: coursesError } = await this.client.from('course').select('*').eq('school_id', schoolId).is('deleted_at', null)

      if (coursesError) {
        throw coursesError
      }

      if (!courses || courses.length === 0) {
        return { courses: [], series: [] } // Retorna vazio se não houver cursos
      }

      // Extract course IDs to use in the series query
      const courseIds = courses.map(course => course.id)

      // Fetch series related to the courses
      const { data: series, error: seriesError } = await this.client.from('series').select('*').in('course_id', courseIds).is('deleted_at', null)

      if (seriesError) {
        throw seriesError
      }

      return {
        courses: courses as Tables<'course'>[] | null,
        series: series as Tables<'series'>[] | null,
      }
    }
    catch (error) {
      console.error(`Erro ao buscar cursos e séries para a escola ${schoolId}:`, error)
      throw new Error(`Failed to fetch courses and series for school ID ${schoolId}`)
    }
  }
}
