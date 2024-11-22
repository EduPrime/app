import { useAuthStore } from '@/store/autSthore'

const apiUrl = import.meta.env.VITE_BACK3ND_URL

export default class BaseService<T = string> {
  baseURL: string
  table: string
  tableType: T
  constructor(table: string) {
    this.baseURL = apiUrl
    this.table = table
  }

  private async request<U>(url: string, options: RequestInit = {}): Promise<{ data: U[], count?: number }> {
    const authStore = useAuthStore()
    const token = authStore.token
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async getById(id: string): Promise<any | null> {
    const { data } = await this.request<any>(`items/${this.table}/${id}`)
    return data
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
    orderBy?: string,
    ascending: boolean = true,
    limit?: number,
  ) {
    try {
      const params = new URLSearchParams()
      if (orderBy)
        params.append('orderBy', orderBy as string)
      params.append('ascending', ascending.toString())
      if (limit)
        params.append('limit', limit.toString())

      const url = `items/${this.table}/?${params.toString()}`
      const { data } = await this.request(url)
      return data
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
  async getBySchoolId(schoolId: string): Promise<any | null> {
    try {
      const filter = encodeURIComponent(JSON.stringify({ school_id: { _eq: schoolId } }))
      const url = `items/${this.table}/?filter=${filter}`
      const { data } = await this.request(url)
      return data
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
    console.warn(functionName, params)
    return null
  }

  /**
   * Create a new record
   * @param record - The record object to create
   * @returns The created record object or throws an error if the operation fails
   */
  async create(record: Record<string, any>): Promise<any | null> {
    try {
      const url = `items/${this.table}`
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(record),
      }
      return this.request(url, options)
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
  async update(id: string, updates: Record<string, any>): Promise<any | null> {
    try {
      const url = `items/${this.table}/${id}`
      const options: RequestInit = {
        method: 'PUT',
        body: JSON.stringify(updates),
      }
      return this.request(url, options)
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
  async softDelete(id: string): Promise<any | null> {
    try {
      const url = `items/${this.table}/${id}`
      const options: RequestInit = {
        method: 'PATCH',
        body: JSON.stringify({ deleted_at: new Date().toISOString() }),
      }
      return this.request(url, options)
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
      const { count } = await this.request<any>(`items/${this.table}`)

      return count || 0
    }
    catch (error) {
      console.error(`Erro ao contar registros na tabela ${this.table}:`, error)
      throw new Error(`Failed to count entries in ${this.table}`)
    }
  }

  /**
   * Fetch records by a specific column and value, ignoring soft-deleted records
   * @param column - The column to filter records by
   * @param value - The value to filter records by
   * @returns An array of records that match the column and value or null if an error occurs
   */
  async filter(column: string, value: string): Promise<any | null> {
    try {
      const filter = encodeURIComponent(JSON.stringify({ [column]: { _eq: value } }))
      const url = `items/${this.table}/?filter=${filter}`
      const { data } = await this.request(url)
      return data
    }
    catch (error) {
      console.error(`Erro ao buscar registros por ${column} na tabela ${this.table}:`, error)
      throw new Error(`Failed to fetch records by ${column} from ${this.table}`)
    }
  }
}
