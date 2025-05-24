import BaseService from '@/services/BaseService'
import type { Institution } from '@prisma/client'
import errorHandler from '@/utils/error-handler'

interface InstitutionToSave {
  id?: string
  name: string
  address?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  phone?: string | null
  email?: string | null
  metadata?: any
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'institution' as const

export default class InstitutionService extends BaseService<Institution> {
  constructor() {
    super(table)
  }

  async getInstitutions() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar instituições')
      return []
    }

    return data as Institution[]
  }

  async getInstitutionById(id: string) {
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
      errorHandler(error, 'Erro ao buscar instituição por ID')
      return null
    }

    return data as Institution | null
  }

  async getInstitutionByName(name: string) {
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
      errorHandler(error, 'Erro ao buscar instituição por nome')
      return null
    }

    return data as Institution | null
  }

  async getInstitutionByNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar instituição por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  async upsertInstitution(institution: InstitutionToSave) {
    const now = new Date().toISOString()

    // Verifica se já existe uma instituição com o mesmo nome (ignorando case)
    const existingWithSameName = await this.getInstitutionByNameInsensitive(
      institution.name,
      institution.id,
    )

    if (existingWithSameName) {
      throw new Error('Nome de instituição já existente')
    }

    let existing = null
    if (institution.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', institution.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError) {
        errorHandler(fetchError, 'Erro ao buscar instituição existente por ID')
      }
      existing = data
    }

    const payload: Partial<Institution> & { id?: string } = {
      name: institution.name,
      address: institution.address || null,
      city: institution.city || null,
      state: institution.state || null,
      postalCode: institution.postalCode || null,
      phone: institution.phone || null,
      email: institution.email || null,
      metadata: institution.metadata || null,
      tenantId: institution.tenantId || null,
      userCreated: institution.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error) {
      errorHandler(error, 'Erro ao inserir/atualizar instituição')
    }
    return data as Institution[]
  }

  async softDeleteInstitution(institutionId: string, userId?: string) {
    if (!institutionId) {
      errorHandler({ message: 'ID da instituição não fornecido' }, 'Erro ao apagar instituição')
      return []
    }

    // Verificar escolas associadas
    const { data: schools, error: schoolsError } = await this.client
      .from('school')
      .select('id')
      .eq('institutionId', institutionId)
      .is('deletedAt', null)

    if (schoolsError) {
      errorHandler(schoolsError, 'Erro ao verificar escolas associadas')
      return []
    }

    if (schools && schools.length > 0) {
      throw new Error('Não é possível excluir: existem escolas vinculadas a essa instituição.')
    }

    // Verificar cursos associados
    const { data: courses, error: coursesError } = await this.client
      .from('course')
      .select('id')
      .eq('institutionId', institutionId)
      .is('deletedAt', null)

    if (coursesError) {
      errorHandler(coursesError, 'Erro ao verificar cursos associados')
      return []
    }

    if (courses && courses.length > 0) {
      throw new Error('Não é possível excluir: existem cursos vinculados a essa instituição.')
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
      .eq('id', institutionId)
      .select()

    if (error) {
      errorHandler(error, 'Erro ao excluir instituição')
      return []
    }

    return data as Institution[]
  }

  async getInstitutionsByFilter(filter: string) {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .or(`name.ilike.%${filter}%, city.ilike.%${filter}%, state.ilike.%${filter}%`)
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar instituições com filtro')
      return []
    }

    return data as Institution[]
  }
}
