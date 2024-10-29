import type { Tables } from '@/types/database.types'
import BaseService from '@/services/BaseService'

const table = 'school' as const

type TabelaType = typeof table

export default class SchoolService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getSchools(): Promise< any | null> {
    try {
      const { data, error } = await this.client
        .from('school')
        .select('*')

      if (error) {
        console.error(error)
        return null
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }

  async searchSchools(searchTerm?: string) {
    try {
      let query = this.client
        .from('school')
        .select('*')

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`)
      }

      const { data, error } = await query
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
