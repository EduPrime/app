import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

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
        errorHandler(error, 'Error fetching series')
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      errorHandler(error, 'Error fetching series')
    }
  }
}
