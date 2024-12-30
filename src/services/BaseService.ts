import { PostgrestClient } from '@supabase/postgrest-js'

const REST_URL = import.meta.env.VITE_POSTGREST_URL

const postgrest = new PostgrestClient(REST_URL, {
  headers: {
    'X-Client-Info': 'your-client-info',
    'Prefer': 'return=representation',
  },
})

export default class BaseService {
  protected client: PostgrestClient
  protected table

  constructor(table: string) {
    this.table = table
    this.client = postgrest
  }

  async getById(id: string) {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('id', id)
        .is('deletedAt', null)
        .single()

      if (error)
        throw error
      return data
    }
    catch (error) {
      console.error(`Erro ao buscar registro por ID na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch record by ID from ${this.table}`)
    }
  }

  async getAll(
    orderBy?: null | string,
    ascending: boolean = true,
    limit?: number,
  ): Promise<[] | null> {
    try {
      let query = this.client.from(this.table).select('*').is('deletedAt', null)

      if (orderBy) {
        query = query.order(orderBy as string, { ascending })
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      if (error)
        throw error

      return data as [] | null
    }
    catch (error) {
      console.error(`Erro ao buscar todos os registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch all records from ${this.table}`)
    }
  }

  async getBySchoolId(schoolId: string): Promise<[] | null> {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('school_id', schoolId)
        .is('deletedAt', null)

      if (error)
        throw error
      return data as [] | null
    }
    catch (error) {
      console.error(`Erro ao buscar registros por school_id na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch records by school_id from ${this.table}`)
    }
  }

  async create(
    record: any,
  ) {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .insert(record)
        .select()
        .single()

      if (error)
        throw error
      return data
    }
    catch (error) {
      console.error(`Erro ao criar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to create record in ${this.table}`)
    }
  }

  async update(
    id: string,
    updates: any,
  ) {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .update(updates)
        .eq('id', id)
        .is('deletedAt', null)
        .select()
        .single()

      if (error)
        throw error
      return data
    }
    catch (error) {
      console.error(`Erro ao atualizar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to update record in ${this.table}`)
    }
  }

  async softDelete(id: string) {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .update({ deletedAt: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error)
        throw error
      return data
    }
    catch (error) {
      console.error(`Erro ao deletar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to delete record from ${this.table}`)
    }
  }

  async countEntries(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from(this.table)
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)

      if (error)
        throw error
      return count || 0
    }
    catch (error) {
      console.error(`Erro ao contar registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to count entries in ${this.table}`)
    }
  }
}
