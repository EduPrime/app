import { createClient } from '@supabase/supabase-js'
import type { Database, Tables } from '@/types/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default class BaseService<TableName extends keyof Database['public']['Tables']> {
  protected client: SupabaseClient<Database>
  protected table: TableName

  constructor(table: TableName) {
    this.table = table
    this.client = supabase
  }

  /**
   * Fetch a single record by ID, ignoring soft-deleted records
   * @param id - The ID of the record to fetch
   * @returns The record object or null if it does not exist or is soft-deleted
   */
  async getById(id: string): Promise<Tables<TableName> | null> {
    try {
      const { data, error } = await this.client.from(this.table).select('*').eq('id', id).is('deleted_at', null).single()

      if (error)
        throw error

      return data as Tables<TableName> | null
    }
    catch (error) {
      console.error(`Erro ao buscar registro por ID na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch record by ID from ${this.table}`)
    }
  }

  /**
   * Fetch all records, ignoring soft-deleted records, optionally ordered by a specific field and limited by a specific number of results.
   * If no `orderBy` is provided, the records are returned in their natural order.
   * @param orderBy - The field to order the results by (optional)
   * @param ascending - Whether the results should be in ascending order (default: true)
   * @param limit - The maximum number of records to return (optional, default: no limit)
   * @returns An array of records or null if an error occurs
   */
  async getAll(
    orderBy?: keyof Tables<TableName>,
    ascending: boolean = true,
    limit?: number,
  ): Promise<Tables<TableName>[] | null> {
    try {
      let query = this.client.from(this.table).select('*').is('deleted_at', null)

      if (orderBy) {
        query = query.order(orderBy as string, { ascending })
      }

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      if (error)
        throw error

      return data as Tables<TableName>[] | null
    }
    catch (error) {
      console.error(`Erro ao buscar todos os registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch all records from ${this.table}`)
    }
  }

  /**
   * Fetch records by school_id, ignoring soft-deleted records
   * @param schoolId - The school_id to filter records by
   * @returns An array of records that match the school_id or null if an error occurs
   */
  async getBySchoolId(schoolId: string): Promise<Tables<TableName>[] | null> {
    try {
      const { data, error } = await this.client.from(this.table).select('*').eq('school_id', schoolId).is('deleted_at', null)

      if (error) {
        throw error
      }

      return data as Tables<TableName>[] | null
    }
    catch (error) {
      console.error(`Erro ao buscar registros por school_id na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch records by school_id from ${this.table}`)
    }
  }

  /**
   * Calls an RPC function in the database
   * @param functionName - Name of the RPC function in the database
   * @param params - Parameters to be passed to the function
   * @returns The result of the function or null if there is an error
   */
  async callRpc(functionName: any, params: Record<string, any>): Promise<any | null> {
    try {
      const { data, error } = await this.client.rpc(functionName, params)
      if (error)
        throw error
      return data
    }
    catch (error) {
      console.error(`Erro ao chamar a função RPC ${functionName}:`, error)
      throw new Error(`Failed to call RPC function ${functionName}`)
    }
  }

  /**
   * Create a new record
   * @param record - The record object to create
   * @returns The created record object or throws an error if the operation fails
   */
  async create(
    record: Database['public']['Tables'][TableName]['Insert'],
  ): Promise<Database['public']['Tables'][TableName]['Row'] | null> {
    try {
      const { data, error } = await this.client.from(this.table as string & keyof Database['public']['Tables']).insert(record).select().single()

      if (error)
        throw error

      return data
    }
    catch (error) {
      console.error(`Erro ao criar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to create record in ${this.table}`)
    }
  }

  /**
   * Update an existing record by ID, ignoring soft-deleted records
   * @param id - The ID of the record to update
   * @param updates - Partial updates to apply to the record
   * @returns The updated record object or null if it does not exist or is soft-deleted
   */
  async update(id: string, updates: Database['public']['Tables'][TableName]['Update']): Promise<Database['public']['Tables'][TableName]['Row'] | null> {
    try {
      const { data, error } = await this.client.from(this.table as string & keyof Database['public']['Tables']).update(updates).eq('id', id).is('deleted_at', null).select().single()

      if (error)
        throw error

      return data
    }
    catch (error) {
      console.error(`Erro ao atualizar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to update record in ${this.table}`)
    }
  }

  /**
   * Soft delete a record by ID
   * @param id - The ID of the record to soft delete
   * @returns The updated record object or null if it does not exist
   */
  async softDelete(id: string): Promise<Database['public']['Tables'][TableName]['Row'] | null> {
    try {
      const { data, error } = await this.client.from(this.table as string & keyof Database['public']['Tables']).update({ deleted_at: new Date()
        .toISOString() }).eq('id', id).select().single()

      if (error)
        throw error

      return data
    }
    catch (error) {
      console.error(`Erro ao deletar registro na tabela ${this.table}:`, error)
      throw new Error(`Failed to delete record from ${this.table}`)
    }
  }

  /**
   * Count the number of records in the table, ignoring soft-deleted records.
   * @returns The number of records in the table or 0 if an error occurs.
   */
  async countEntries(): Promise<number> {
    try {
      const { count, error } = await this.client.from(this.table).select('*', { count: 'exact', head: true }).is('deleted_at', null)

      if (error) {
        throw error
      }

      return count || 0 // Retorna 0 se count for null
    }
    catch (error) {
      console.error(`Erro ao contar registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to count entries in ${this.table}`)
    }
  }
}
