import BaseService from '@/services/BaseService'

const table = 'course' as const

type CourseTable = typeof table

export default class CourseService extends BaseService<CourseTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getBySchoolId(id: string) {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('school_id', id)
        .is('deleted_at', null)
        .single()

      if (error)
        throw error
      console.log('Entrou e pegou', data)
      return data
    }
    catch (error) {
      console.error(`Erro ao buscar registro por ID na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch record by ID from ${this.table}`)
    }
  }
}
