import BaseService from '@/services/BaseService'
import type { Classroom } from '@prisma/client'
import errorHandler from '@/utils/error-handler'

interface ClassroomToSave {
  id?: string
  name: string
  abbreviation?: string
  seriesId: string
  maxStudents: number
  exceededStudents?: number
  totalStudents?: number
  pcdStudents?: number
  startTime?: Date | null
  startTimeInterval?: Date | null
  endTimeInterval?: Date | null
  endTime?: Date | null
  dayofweek?: string[]
  room?: string | null
  regimeType?: string | null
  period?: string | null
  status?: string | null
  year: number
  isMultiSerialized?: boolean | null
  schoolId?: string | null
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'classroom' as const

export default class ClassroomService extends BaseService<Classroom> {
  constructor() {
    super(table)
  }

  async getClassrooms() {
    const { data, error } = await this.client
      .from(table)
      .select('*, series:seriesId(*), school:schoolId(*)')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas')
      return []
    }

    if (data && data.length > 0) {
      data.forEach(classroom => {
        if (classroom.series && classroom.series.courseId) {
          (classroom as any).courseId = classroom.series.courseId
        }
      })
    }

    return data as (Classroom & { series: any; school: any; courseId?: string })[]
  }

  async getClassroomById(id: string) {
    if (!id) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*, series:seriesId(*), school:schoolId(*)')
      .eq('id', id)
      .is('deletedAt', null)
      .maybeSingle()

    if (error) {
      errorHandler(error, 'Erro ao buscar turma por ID')
      return null
    }

    if (data && data.series && data.series.courseId) {
      (data as any).courseId = data.series.courseId
    }

    return data as (Classroom & { series: any; school: any; courseId?: string }) | null
  }

  async getClassroomByName(name: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*, series:seriesId(*), school:schoolId(*)')
      .eq('name', name)
      .is('deletedAt', null)
      .maybeSingle()

    if (error) {
      errorHandler(error, 'Erro ao buscar turma por nome')
      return null
    }

    if (data && data.series && data.series.courseId) {
      (data as any).courseId = data.series.courseId
    }

    return data as (Classroom & { series: any; school: any; courseId?: string }) | null
  }
  async getClassroomByNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar turma por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }
  async getClassroomsBySeriesId(seriesId: string) {
    if (!seriesId) {
      return []
    }

    const { data, error } = await this.client
      .from(table)
      .select('*, series:seriesId(*), school:schoolId(*)')
      .eq('seriesId', seriesId)
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas por série')
      return []
    }

    if (data && data.length > 0) {
      data.forEach(classroom => {
        if (classroom.series && classroom.series.courseId) {
          (classroom as any).courseId = classroom.series.courseId
        }
      })
    }

    return data as (Classroom & { series: any; school: any; courseId?: string })[]
  }
  async getClassroomsBySchoolId(schoolId: string) {
    if (!schoolId) {
      return []
    }

    const { data, error } = await this.client
      .from(table)
      .select('*, series:seriesId(*), school:schoolId(*)')
      .eq('schoolId', schoolId)
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar turmas por escola')
      return []
    }

    if (data && data.length > 0) {
      data.forEach(classroom => {
        if (classroom.series && classroom.series.courseId) {
          (classroom as any).courseId = classroom.series.courseId
        }
      })
    }

    return data as (Classroom & { series: any; school: any; courseId?: string })[]
  }

  async upsertClassroom(classroom: ClassroomToSave) {
    const now = new Date().toISOString()

    const existingWithSameName = await this.getClassroomByNameInsensitive(
      classroom.name,
      classroom.id,
    )

    if (existingWithSameName) {
      const sameClassroom = await this.getClassroomById(existingWithSameName.id)
      if (sameClassroom && sameClassroom.seriesId === classroom.seriesId) {
        throw new Error('Nome de turma já existente para esta série')
      }
    }

    let existing = null
    if (classroom.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', classroom.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar turma existente por ID')
      existing = data
    }

    const payload: Partial<Classroom> & { id?: string } = {
      name: classroom.name,
      abbreviation: classroom.abbreviation || null,
      seriesId: classroom.seriesId,
      maxStudents: classroom.maxStudents,
      exceededStudents: classroom.exceededStudents || 0,
      totalStudents: classroom.totalStudents || 0,
      pcdStudents: classroom.pcdStudents || 0,
      startTime: classroom.startTime || null,
      startTimeInterval: classroom.startTimeInterval || null,
      endTimeInterval: classroom.endTimeInterval || null,
      endTime: classroom.endTime || null,
      dayofweek: classroom.dayofweek || [],
      room: classroom.room || null,
      regimeType: classroom.regimeType || 'Presencial',
      period: classroom.period || 'MORNING',
      status: classroom.status || 'ACTIVE',
      year: classroom.year,
      isMultiSerialized: classroom.isMultiSerialized || false,
      schoolId: classroom.schoolId || null,
      tenantId: classroom.tenantId || null,
      userCreated: classroom.userCreated || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error)
      errorHandler(error, 'Erro ao inserir/atualizar turma')
    return data as Classroom[]
  }

  async softDeleteClassroom(classroomId: string, userId?: string) {
    if (!classroomId) {
      errorHandler({ message: 'ID da turma não fornecido' }, 'Erro ao apagar turma')
      return []
    }

    const { data: enrollments, error: enrollmentsError } = await this.client
      .from('enrollment')
      .select('id')
      .eq('classroomId', classroomId)
      .is('deletedAt', null)

    if (enrollmentsError) {
      errorHandler(enrollmentsError, 'Erro ao verificar matrículas associadas')
      return []
    }

    if (enrollments && enrollments.length > 0) {
      throw new Error('Não é possível excluir: existem alunos matriculados nesta turma.')
    }

    const { data: schedules, error: schedulesError } = await this.client
      .from('schedule')
      .select('id')
      .eq('classroomId', classroomId)
      .is('deletedAt', null)

    if (schedulesError) {
      errorHandler(schedulesError, 'Erro ao verificar horários associados')
      return []
    }

    if (schedules && schedules.length > 0) {
      throw new Error('Não é possível excluir: existem horários associados a esta turma.')
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
      .eq('id', classroomId)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, 'Erro ao apagar turma')
    return data ?? []
  }
}
