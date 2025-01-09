import { useAuthStore } from '@/store/AuthStore'
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
      throw new Error(`Failed to initialize PostgrestClient: ${error.message}`)
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
      throw new Error(error.message)
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
      throw new Error(error.message)
    return data
  }



  async getAll(
    orderBy?: string,
    ascending = true,
    limit?: number,
  ) {

    let query = this.client.from(this.table).select('*')

    if (orderBy) {
      query = query.order(orderBy as string, { ascending })
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error)
      throw new Error(error.message)
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
      if (error.message.includes('JWT ')) {
        //  new AuthService().logout()
      }
      throw new Error(error.message)
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
      throw new Error(error.message)
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
      throw new Error(error.message)
    return data
  }

  async callRpc(functionName: string, params: Record<string, unknown>): Promise<unknown> {
    const { data, error } = await this.client.rpc(functionName, params)
    if (error)
      throw new Error(error.message)
    return data
  }

  async countEntries(): Promise<number> {
    const { count, error } = await this.client
      .from(this.table)
      .select('*', { count: 'exact', head: true })

    if (error)
      throw new Error(error.message)
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
      throw new Error(error.message)
    return data || []
  }
}