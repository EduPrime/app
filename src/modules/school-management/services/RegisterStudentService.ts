import type { Student } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface StudentToSave {
  id?: string
  name: string
  email?: string
  phone?: string
  address?: string
  birthdate?: Date
  gender?: string
  schoolId?: string
  status?: string
  metadata?: any
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'student' as const

export default class RegisterStudentService extends BaseService<Student> {
  constructor() {
    super(table)
  }

  async getStudents() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar estudantes')
    }
    return data as Student[]
  }

  async getStudentById(id: string) {
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
      errorHandler(error, 'Erro ao buscar estudante por ID')
    }
    return data as Student | null
  }

  async getStudentByName(name: string) {
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
      errorHandler(error, 'Erro ao buscar estudante por nome')
    }
    return data as Student | null
  }

  async getStudentByEmail(email: string) {
    if (!email) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('email', email)
      .is('deletedAt', null)
      .maybeSingle()

    if (error) {
      errorHandler(error, 'Erro ao buscar estudante por email')
    }
    return data as Student | null
  }

  async upsertStudent(student: StudentToSave) {
    const now = new Date().toISOString()

    let existing = null
    if (student.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', student.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar estudante existente por ID')
      existing = data
    }
    else if (student.email) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('email', student.email)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar estudante existente por email')
      existing = data
    }

    const payload: Partial<Student> & { id?: string } = {
      name: student.name,
      email: student.email || null,
      phone: student.phone || null,
      address: student.address || null,
      birthdate: student.birthdate ? new Date(student.birthdate).toISOString() : null,
      gender: student.gender || null,
      schoolId: student.schoolId || null,
      status: student.status || 'ACTIVE',
      metadata: student.metadata || null,
      tenantId: student.tenantId || null,
      userCreated: student.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error)
      errorHandler(error, 'Erro ao inserir/atualizar estudante')
    return data as Student[]
  }

  async softDeleteStudent(studentId: string, userId?: string) {
    if (!studentId) {
      errorHandler({ message: 'ID do estudante não fornecido' }, 'Erro ao apagar estudante')
      return []
    }

    // Verificar se existem matrículas para este estudante
    const { data: enrollments, error: enrollmentsError } = await this.client
      .from('enrollment')
      .select('id')
      .eq('studentId', studentId)
      .is('deletedAt', null)

    if (enrollmentsError) {
      errorHandler(enrollmentsError, 'Erro ao verificar matrículas associadas')
      return []
    }

    if (enrollments && enrollments.length > 0) {
      throw new Error('Não é possível excluir: existem matrículas vinculadas a esse estudante.')
    }

    // Verificar se existem pré-matrículas para este estudante
    const { data: preEnrollments, error: preEnrollmentsError } = await this.client
      .from('preenrollment')
      .select('id')
      .eq('studentId', studentId)
      .is('deletedAt', null)

    if (preEnrollmentsError) {
      errorHandler(preEnrollmentsError, 'Erro ao verificar pré-matrículas associadas')
      return []
    }

    if (preEnrollments && preEnrollments.length > 0) {
      throw new Error('Não é possível excluir: existem pré-matrículas vinculadas a esse estudante.')
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
      .eq('id', studentId)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, 'Erro ao apagar estudante')
    return data ?? []
  }
}
