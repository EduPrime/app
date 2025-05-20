import { useAuthStore } from '@/store/AuthStore'
import errorHandler from '@/utils/error-handler'
import { getPostgrestURL } from '@/utils/getPostgrestURL'
import { PostgrestClient } from '@supabase/postgrest-js'

export default class BaseService<T> {
  public client: PostgrestClient
  private userId: string | undefined
  private orgId: string | undefined
  constructor(private readonly table: string) {
    const authStore = useAuthStore()
    this.userId = (authStore.userLocal as unknown as { id: string | undefined })?.id
    this.orgId = authStore.organization?.id

    const token = authStore.getPostgrestToken()
    const postgrestUrl = getPostgrestURL()

    try {
      this.client = new PostgrestClient(`https://${postgrestUrl}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })
    }
    catch (error: any) {
      authStore.logout()
      errorHandler(error, 'Failed to create PostgREST client')
    }
  }

  async getById(id: string): Promise<T | null> {
    if (!id)
      return null

    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single()

    if (error)
      errorHandler(error, 'Failed to get record by ID')
    return data
  }

  async getByInCustomTable(customTable: string, id: string): Promise<{
    id: any
    name: any
  } | null> {
    if (!id)
      return null

    const { data, error } = await this.client
      .from(customTable)
      .select('id, name')
      .eq('id', id)
      .single()

    if (error)
      errorHandler(error, 'Failed to get record by ID')
    return data
  }

  async getBySchoolId(schoolId: string): Promise<T | null> {
    if (!schoolId)
      return null

    const { data, error } = await this.client
      .from(this.table)
      .select('*')
      .eq('schoolId', schoolId)
      .single()

    if (error)
      errorHandler(error, 'Failed to get record by school ID')
    return data
  }

  async searchByQuery(table: string, query: string, searchAreas: string[] = ['name']) {
    if (!query || !searchAreas.length)
      return []

    const searchAreaString = searchAreas.map(area => `${area}.ilike.%${query}%`).join(',')
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .or(searchAreaString)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, `Failed to find ${query} from ${table}`)
    return data
  }

  async searchFilterByQuery(
    table: string,
    query: string,
    searchAreas: string[] = ['name'],
    filterAreas: { relationship: string, value: string }[],
  ) {
    if (!query || !searchAreas.length || !filterAreas.length)
      return []
    const searchAreaString = searchAreas
      .map(area => `${area}.ilike.%${query}%`)
      .join(',')

    let queryBuilder = this.client
      .from(table)
      .select('*')
      .or(searchAreaString)
      .is('deletedAt', null)

    // Aplicando múltiplos filtros individualmente dentro da consulta
    filterAreas.forEach((item) => {
      queryBuilder = queryBuilder.filter(item.relationship, 'eq', item.value)
    })

    const { data, error } = await queryBuilder

    if (error)
      errorHandler(error, `Failed to find ${query} from ${table}`)

    return data
  }

  async getAll(
    orderBy?: string,
    ascending = true,
    limit?: number,
  ) {
    let query = this.client.from(this.table).select('*').is('deletedAt', null)

    if (orderBy) {
      query = query.order(orderBy as string, { ascending })
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error)
      errorHandler(error, 'Failed to get all records')
    return data || []
  }

  async create(record: T): Promise<T | null> {
    const recordWithAudit = {
      ...record,
      userCreated: this.userId,
      tenantId: this.orgId,
    } as unknown as T

    const { data, error } = await this.client
      .from(this.table)
      .insert(recordWithAudit)
      .select()
      .single()

    if (error) {
      errorHandler(error, 'Failed to create record')
    }
    return data
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const updatesWithAudit = {
      ...updates,
      updatedBy: this.userId,
      updatedAt: new Date().toISOString(),
    } as unknown as Partial<T>

    const { data, error } = await this.client
      .from(this.table)
      .update(updatesWithAudit)
      .eq('id', id)
      .select()
      .single()

    if (error)
      errorHandler(error, 'Failed to update record')
    return data
  }

  async softDelete(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.table)
      .update({
        deletedAt: new Date().toISOString(),
        updatedBy: this.userId,
      } as unknown as Partial<T>)
      .eq('id', id)
      .select()
      .single()

    if (error)
      errorHandler(error, 'Failed to soft delete record')
    return data
  }

  async callRpc(functionName: string, params: Record<string, unknown>): Promise<unknown> {
    const { data, error } = await this.client.rpc(functionName, params)
    if (error)
      errorHandler(error, `Failed to call RPC function ${functionName}`)
    return data
  }

  async countEntries(): Promise<number> {
    const { count, error } = await this.client
      .from(this.table)
      .select('*', { count: 'exact', head: true })

    if (error)
      errorHandler(error, 'Failed to count entries')
    return count || 0
  }

  async filter(filters: Partial<Record<keyof T, string | string[]>>): Promise<T[]> {
    let query = this.client.from(this.table).select('*')

    for (const [column, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        query = query.in(column, value)
      }
      else {
        query = query.eq(column, value)
      }
    }

    const { data, error } = await query

    if (error)
      errorHandler(error, 'Failed to filter records')
    return data || []
  }
}
