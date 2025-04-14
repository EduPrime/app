import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'course' as const

type TabelaType = typeof table

export default class CourseService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getCoursesBySchoolId(schoolId: string) {
    try {
      const { data, error } = await this.client
        .from('course')
        .select('*')
        .eq('schoolId', schoolId)

      if (error) {
        errorHandler(error, 'Error fetching courses by school ID')
        return void 0
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }
}
