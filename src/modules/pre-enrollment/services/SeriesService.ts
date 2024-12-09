import BaseService from '@/services/BaseService'

const table = 'series' as const

type TabelaType = typeof table

export default class SeriesService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getSeries(courseId: string) {
    try {
      const { data, error } = await this.client
        .from('series')
        .select('*')
        .eq('courseId', courseId)

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
