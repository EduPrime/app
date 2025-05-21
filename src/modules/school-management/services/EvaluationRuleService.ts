import type { EvaluationRule } from '@prisma/client'
import Decimal from 'decimal.js'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

interface EvaluationRuleToSave {
  id?: string
  name: string
  gradeType: string
  progressionType: string
  parallelMakeupExam: string
  averageFormula?: string
  makeupFormula?: string | null
  maximumGrade?: string | number | Decimal
  minimumGrade?: string | number | Decimal
  numberActivities?: number
  average?: string | number | Decimal
  frequencyType?: string | null
  feedbackType?: string | null
  attendancePercentage?: string | number | Decimal
  tenantId?: string | null
  userCreated?: string | null
}

const table = 'evaluationRule' as const

export default class EvaluationRuleService extends BaseService<EvaluationRule> {
  constructor() {
    super(table)
  }

  async getEvaluationRules() {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .is('deletedAt', null)
      .order('name')

    if (error) {
      errorHandler(error, 'Erro ao buscar regras de avaliação')
    }
    return data as EvaluationRule[]
  }

  async getEvaluationRuleById(id: string) {
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
      errorHandler(error, 'Erro ao buscar regra de avaliação por ID')
    }
    return data as EvaluationRule | null
  }

  async getEvaluationRuleByName(name: string) {
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
      errorHandler(error, 'Erro ao buscar regra de avaliação por nome')
    }
    return data as EvaluationRule | null
  }
  async getEvaluationRuleByNameInsensitive(name: string, excludeId?: string) {
    if (!name) {
      return null
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .ilike('name', name)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar regra de avaliação por nome')
      return null
    }

    const filtered = excludeId ? data.filter(item => item.id !== excludeId) : data
    return filtered.length > 0 ? filtered[0] : null
  }

  async getEvaluationRulesByCourseId(courseId: string) {
    if (!courseId) {
      return []
    }

    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('courseId', courseId)
      .is('deletedAt', null)

    if (error) {
      errorHandler(error, 'Erro ao buscar regras de avaliação por curso')
      return []
    }

    return data as EvaluationRule[]
  }

  async upsertEvaluationRule(rule: EvaluationRuleToSave) {
    const now = new Date().toISOString()

    const existingWithSameName = await this.getEvaluationRuleByNameInsensitive(
      rule.name,
      rule.id,
    )
    if (existingWithSameName) {
      throw new Error('Nome de regra já existente')
    }

    let existing = null
    if (rule.id) {
      const { data, error: fetchError } = await this.client
        .from(table)
        .select('*')
        .eq('id', rule.id)
        .is('deletedAt', null)
        .maybeSingle()

      if (fetchError)
        errorHandler(fetchError, 'Erro ao buscar regra de avaliação existente por ID')
      existing = data
    }

    const payload = {
      name: rule.name,
      gradeType: rule.gradeType,
      progressionType: rule.progressionType,
      parallelMakeupExam: rule.parallelMakeupExam,
      averageFormula: rule.averageFormula || '',
      makeupFormula: rule.makeupFormula || null,
      maximumGrade: rule.maximumGrade instanceof Decimal ? rule.maximumGrade : new Decimal(rule.maximumGrade?.toString() || '10'),
      minimumGrade: rule.minimumGrade instanceof Decimal ? rule.minimumGrade : new Decimal(rule.minimumGrade?.toString() || '6'),
      numberActivities: rule.numberActivities || 3,
      average: rule.average instanceof Decimal ? rule.average : new Decimal(rule.average?.toString() || '6'),
      frequencyType: rule.frequencyType || null,
      feedbackType: rule.feedbackType || null,
      attendancePercentage: rule.attendancePercentage instanceof Decimal ? rule.attendancePercentage : new Decimal(rule.attendancePercentage?.toString() || '75'),
      tenantId: rule.tenantId || null,
      deletedAt: null,
      updatedAt: now,
      ...(existing?.id && { id: existing.id }),
    }

    const { data, error } = await this.client
      .from(table)
      .upsert(payload)
      .select()

    if (error)
      errorHandler(error, 'Erro ao inserir/atualizar regra de avaliação')
    return data as EvaluationRule[]
  }

  async softDeleteEvaluationRule(ruleId: string, userId?: string) {
    if (!ruleId) {
      errorHandler({ message: 'ID da regra de avaliação não fornecido' }, 'Erro ao apagar regra de avaliação')
      return []
    }

    /* 
    const { data: associatedRecords, error: assocError } = await this.client
      .from('someTable')
      .select('id')
      .eq('evaluationRuleId', ruleId)
      .is('deletedAt', null)

    if (assocError) {
      errorHandler(assocError, 'Erro ao verificar registros associados')
      return []
    }

    if (associatedRecords && associatedRecords.length > 0) {
      throw new Error('Não é possível excluir: existem registros vinculados a essa regra.')
    }
    */

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
      .eq('id', ruleId)
      .is('deletedAt', null)

    if (error)
      errorHandler(error, 'Erro ao apagar regra de avaliação')
    return data ?? []
  }
}
