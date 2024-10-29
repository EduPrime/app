import BaseService from '@/services/BaseService'
import { ref } from 'vue'

const table = 'school_course' as const

type TabelaType = typeof table

export default class School_courseService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getCoursesBySchoolId(school_id: string) {
    try {
      const courses = ref<any>([])
      const { data, error } = await this.client
        .from('school_course')
        .select('course_id')
        .eq('school_id', school_id)

      if (data) {
        const coursePromises = data.map(async (c: any) => {
          const { data: courseData, error: courseError } = await this.client
            .from('course')
            .select('*')
            .eq('id', c.course_id)
            .single()

          if (courseError) {
            console.error(courseError)
            return null
          }

          return courseData
        })

        const resolvedCourses = await Promise.all(coursePromises)
        courses.value = resolvedCourses.filter(course => course !== null)
      }

      if (error) {
        console.error(error)
        return void 0
      }
      else {
        return courses.value
      }
    }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }
}
