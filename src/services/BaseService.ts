import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Cria o cliente Supabase usando as variáveis de ambiente
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default class BaseService<T> {
  protected client: SupabaseClient
  protected table: string

  constructor(table: string) {
    this.table = table
    this.client = supabase // Usa o cliente Supabase criado
  }

  /**
   * Fetch a single record by ID, ignoring soft-deleted records
   * @param id - The ID of the record to fetch
   * @returns The record object or null if it does not exist or is soft-deleted
   */
  async getById(id: string): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .select('*')
        .eq('id', id)
        .is('deleted_at', null) // Ensure the record is not soft-deleted
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

  /**
   * Fetch all records, ignoring soft-deleted records, optionally ordered by a specific field and limited by a specific number of results.
   * If no `orderBy` is provided, the records are returned in their natural order.
   * @param orderBy - The field to order the results by (optional)
   * @param ascending - Whether the results should be in ascending order (default: true)
   * @param limit - The maximum number of records to return (optional, default: no limit)
   * @returns An array of records or null if an error occurs
   */
  async getAll(orderBy?: keyof T, ascending: boolean = true, limit?: number): Promise<T[] | null> {
    try {
      const query = this.client
        .from(this.table)
        .select('*')
        .is('deleted_at', null) // Ensure only active records are returned

      // Apply ordering only if `orderBy` is provided
      if (orderBy) {
        query.order(orderBy as string, { ascending })
      }

      // Apply limit if provided
      if (limit) {
        query.limit(limit)
      }

      const { data, error } = await query

      if (error)
        throw error

      return data
    }
    catch (error) {
      console.error(`Erro ao buscar todos os registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch all records from ${this.table}`)
    }
  }

  /**
   * Create a new record
   * @param record - The record object to create
   * @returns The created record object or throws an error if the operation fails
   */
  async create(record: T): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .insert(record)
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

  /**
   * Update an existing record by ID, ignoring soft-deleted records
   * @param id - The ID of the record to update
   * @param updates - Partial updates to apply to the record
   * @returns The updated record object or null if it does not exist or is soft-deleted
   */
  async update(id: string, updates: Partial<T>): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .update(updates)
        .eq('id', id)
        .is('deleted_at', null) // Ensure the record is not soft-deleted
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

  /**
   * Soft delete a record by ID
   * @param id - The ID of the record to soft delete
   * @returns The updated record object or null if it does not exist
   */
  async softDelete(id: string): Promise<T | null> {
    try {
      const { data, error } = await this.client
        .from(this.table)
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id)
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
}
