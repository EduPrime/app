import type { Course } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'course' as const

export default class CourseService extends BaseService<Course> {
  constructor() {
    super(table)
  }

  async getById(id: string) {
    if (!id) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('id', id)
      .is('deletedAt', null)
      .maybeSingle()

    if (error) {
      errorHandler(error, 'Erro ao buscar curso por ID')
    }
    return data as Course | null
  }

  async getItems() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar curso')
    }
    return data as Course[]
  }

  async softDeleteItem(serverFunctionId: string, userId?: string) {
    if (!serverFunctionId) {
      errorHandler({ message: 'ID do curso não fornecido' }, 'Erro ao apagar curso')
      return []
    }

    const { data: servers, error: assocError } = await this.client
      .from('servers')
      .select('id')
      .eq('functionId', serverFunctionId)
      .is('deletedAt', null)

    if (assocError) {
      errorHandler(assocError, 'Erro ao verificar servidores associados')
      return []
    }

    if (servers && servers.length > 0) {
      throw new Error('Não é possível excluir: existem servidores vinculados a essa curso.')
    }

    const now = new Date().toISOString()
    const updateFields: Record<string, any> = {
      deletedAt: now,
      updatedAt: now,
    }

    if (userId) {
      updateFields.updatedBy = userId
    }

    const { data, error } = await this.client
      .from(table)
      .update(updateFields)
      .eq('id', serverFunctionId)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, 'Erro ao apagar curso')
    return data ?? []
  }

  async getServerNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar item por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  async getByAbbreviationInsensitive(abbreviation: string, excludeId?: string) {
    if (!abbreviation) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('abbreviation', abbreviation)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar item por abreviação')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  async upsertItem(item: any) { // @TODO: Definir tipagem
    const now = new Date().toISOString()

    // Verifica se já existe uma item com o mesmo nome (ignorando case)
    const existingWithSameName = await this.getServerNameInsensitive(
      item.name,
      item.id,
    )
    if (existingWithSameName) {
      throw new Error('Nome de item já existente')
    }

    // Verifica se já existe uma item com a mesma abreviação (ignorando case)
    const existingWithSameAbbreviation = await this.getByAbbreviationInsensitive(
      item.abbreviation,
      item.id,
    )
    if (existingWithSameAbbreviation) {
      throw new Error('Abreviação de item já existente')
    }

    let existing = null
    if (item.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', item.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar item existente por ID')
      existing = data
    }

    const payload: Partial<any> & { id?: string } = { // @TODO: Definir tipagem
      name: item.name,
      abbreviation: item.abbreviation,
      description: item.description || null,
      tenantId: item.tenantId || null,
      userCreated: item.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error)
      errorHandler(error, 'Erro ao inserir/atualizar item')
    return data as any[] // @TODO: Definir tipagem
  }
}
