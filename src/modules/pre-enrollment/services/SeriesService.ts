import BaseService from '@/services/BaseService'

const table = 'series' as const

type TabelaType = typeof table

export default class SeriesService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getSeries(course_id: string) {
    try {
      const { data, error } = await this.client
        .from('series')
        .select('*')
        .eq('course_id', course_id)

      if (error) {
        console.error(error)
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
