import type { School } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface SchoolToSave {
  id?: string
  idpes?: number | null
  INEPCode?: string | null
  corporateName?: string | null
  acronym?: string | null
  blockJournalEntries?: boolean | null
  operationalStatus?: boolean | null
  usesAlternativeRules?: boolean | null
  educationNetwork?: boolean | null
  administrativeDependency?: string | null
  institutionId?: string | null
  name: string
  cnpj?: string | null
  address?: string | null
  addressNumber?: string | null
  additionalInfo?: string | null
  neighborhood?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  unusualLocation?: boolean | null
  phone?: string | null
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'school' as const

const now = new Date().toISOString()

export default class SchoolService extends BaseService<School> {
  constructor() {
    super(table)
  }

  async getSchools() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar escolas')
      return []
    }

    return data as School[]
  }

  async getSchoolById(id: string) {
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
      errorHandler(error, 'Erro ao buscar escola por ID')
      return null
    }

    return data as School | null
  }

  async getSchoolByName(name: string) {
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
      errorHandler(error, 'Erro ao buscar escola por nome')
      return null
    }

    return data as School | null
  }

  async getSchoolByNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar escola por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data

    return filtered.length > 0 ? filtered[0] : null
  }

  async getSchoolCount() {
    try {
      const { count, error } = await this.client
        .from(table)
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)

      if (error)
        errorHandler(error, 'Erro ao contar escolas')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar escolas')
      return 0
    }
  }

  async getAllSchools() {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('id, name')

      if (error) {
        errorHandler(error, 'Erro ao buscar escolas')
        return []
      }

      return data as Pick<School, 'id' | 'name'>[]
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar escolas')
      return []
    }
  }

  async getClassCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('classroom')
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)

      if (error)
        errorHandler(error, 'Erro ao contar turmas')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar turmas')
      return 0
    }
  }

  async getTeacherCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('teacher')
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)

      if (error)
        errorHandler(error, 'Erro ao contar professores')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar professores')
      return 0
    }
  }

  async getApprovalRate(): Promise<number> {
    try {
      const { count: totalStudents, error: totalError } = await this.client
        .from('student')
        .select('*', { count: 'exact', head: true })

      if (totalError)
        errorHandler(totalError, 'Erro ao contar estudantes')

      const { count: approvedStudents, error: approvedError } = await this.client
        .from('student')
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)
      /*   .filter({ approved: true }) // Filtra os estudantes aprovados ou .eq({ approved: true }) */

      if (approvedError)
        errorHandler(approvedError, 'Erro ao contar estudantes aprovados')

      const total = totalStudents ?? 0
      const approved = approvedStudents ?? 0
      return total > 0 ? Math.round((approved / total) * 100) : 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao calcular taxa de aprovação')
      return 0
    }
  }

  async getStudentCount(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from('student')
        .select('*', { count: 'exact', head: true })
        .is('deletedAt', null)

      if (error)
        errorHandler(error, 'Erro ao contar estudantes')
      return count ?? 0
    }
    catch (error) {
      errorHandler(error, 'Erro ao contar estudantes')
      return 0
    }
  }

  async getAvailableSchools(): Promise<School[]> {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('*')
        .is('deletedAt', null)
        .order('name')

      if (error) {
        errorHandler(error, 'Erro ao buscar escolas disponíveis')
        return []
      }

      return data as School[]
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar escolas disponíveis')
      return []
    }
  }

  async upsertSchool(school: SchoolToSave) {

    console.log("school", school)

    const existingWithSameName = await this.getSchoolByNameInsensitive(
      school.name,
      school.id,
    )

    if (existingWithSameName) {
      const sameSchool = await this.getSchoolById(existingWithSameName.id)

      if (sameSchool && sameSchool.id !== school.id) {
        throw new Error('Nome de escola já existente')
      }
    }

    let existing = null
    if (school.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', school.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar escola existente por ID')
      existing = data
    }

    const payload: Partial<School> & { id?: string } = {
      name: school.name,
      idpes: school.idpes || null,
      INEPCode: school.INEPCode || null,
      corporateName: school.corporateName || null,
      acronym: school.acronym || null,
      blockJournalEntries: school.blockJournalEntries || false,
      operationalStatus: school.operationalStatus || true,
      usesAlternativeRules: school.usesAlternativeRules || false,
      educationNetwork: school.educationNetwork || false,
      administrativeDependency: school.administrativeDependency || null,
      institutionId: school.institutionId || null,
      cnpj: school.cnpj ? school.cnpj.replace(/\D/g, '') : null,
      address: school.address || null,
      addressNumber: school.addressNumber || null,
      additionalInfo: school.additionalInfo || null,
      neighborhood: school.neighborhood || null,
      city: school.city || null,
      state: school.state || null,
      postalCode: school.postalCode ? school.postalCode.replace(/\D/g, '') : null,
      unusualLocation: school.unusualLocation || false,
      phone: school.phone ? school.phone.replace(/\D/g, '') : null,
      //phone2: school.phone2 ? school.phone2.replace(/\D/g, '') : null,
      tenantId: school.tenantId || null,
      userCreated: school.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error) {
      errorHandler(error, 'Erro ao inserir/atualizar escola')
      return []
    }

    return data as School[]
  }

  async softDeleteSchool(schoolId: string, userId?: string) {
    if (!schoolId) {
      errorHandler({ message: 'ID da escola não fornecido' }, 'Erro ao apagar escola')
      return []
    }

    const { data: classrooms, error: classroomsError } = await this.client
      .from('classroom')
      .select('id')
      .eq('schoolId', schoolId)
      .is('deletedAt', null)

    if (classroomsError) {
      errorHandler(classroomsError, 'Erro ao verificar turmas associadas')
      return []
    }

    if (classrooms && classrooms.length > 0) {
      throw new Error('Não é possível excluir: existem turmas associadas a esta escola.')
    }

    const { data: teachers, error: teachersError } = await this.client
      .from('teacher')
      .select('id')
      .eq('schoolId', schoolId)
      .is('deletedAt', null)

    if (teachersError) {
      errorHandler(teachersError, 'Erro ao verificar professores associados')
      return []
    }

    if (teachers && teachers.length > 0) {
      throw new Error('Não é possível excluir: existem professores associados a esta escola.')
    }

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
      .eq('id', schoolId)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, 'Erro ao apagar escola')
    return data ?? []
  }
}
