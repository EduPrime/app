import type { ServerFunction } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface ServerFunctionToSave {
  id?: string
  name: string
  abbreviation: string
  description?: string
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'serverFunction' as const

export default class ServerFunctionService extends BaseService<ServerFunction> {
  constructor() {
    super(table)
  }

  async getServerFunctions() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar funções de servidor')
    }
    return data as ServerFunction[]
  }

  async getServerFunctionById(id: string) {
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
      errorHandler(error, 'Erro ao buscar função de servidor por ID')
    }
    return data as ServerFunction | null
  }

  async getServerFunctionByName(name: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('name', name)
      .is('deletedAt', null)
      .maybeSingle()

    if (error) {
      errorHandler(error, 'Erro ao buscar função de servidor por nome')
    }
    return data as ServerFunction | null
  }

  // Busca função por nome ignorando maiúsculas/minúsculas
  async getServerFunctionByNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar função de servidor por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  // Busca função por abreviação ignorando maiúsculas/minúsculas
  async getServerFunctionByAbbreviationInsensitive(abbreviation: string, excludeId?: string) {
    if (!abbreviation) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('abbreviation', abbreviation)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar função de servidor por abreviação')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  async upsertServerFunction(serverFunction: ServerFunctionToSave) {
    const now = new Date().toISOString()

    // Verifica se já existe uma função com o mesmo nome (ignorando case)
    const existingWithSameName = await this.getServerFunctionByNameInsensitive(
      serverFunction.name,
      serverFunction.id,
    )
    if (existingWithSameName) {
      throw new Error('Nome de função já existente')
    }

    // Verifica se já existe uma função com a mesma abreviação (ignorando case)
    const existingWithSameAbbreviation = await this.getServerFunctionByAbbreviationInsensitive(
      serverFunction.abbreviation,
      serverFunction.id,
    )
    if (existingWithSameAbbreviation) {
      throw new Error('Abreviação de função já existente')
    }

    let existing = null
    if (serverFunction.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', serverFunction.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar função de servidor existente por ID')
      existing = data
    }

    const payload: Partial<ServerFunction> & { id?: string } = {
      name: serverFunction.name,
      abbreviation: serverFunction.abbreviation,
      description: serverFunction.description || null,
      tenantId: serverFunction.tenantId || null,
      userCreated: serverFunction.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error)
      errorHandler(error, 'Erro ao inserir/atualizar função de servidor')
    return data as ServerFunction[]
  }

  async softDeleteServerFunction(serverFunctionId: string, userId?: string) {
    if (!serverFunctionId) {
      errorHandler({ message: 'ID da função de servidor não fornecido' }, 'Erro ao apagar função de servidor')
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
      throw new Error('Não é possível excluir: existem servidores vinculados a essa função.')
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
      errorHandler(error, 'Erro ao apagar função de servidor')
    return data ?? []
  }
}
