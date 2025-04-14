import type { EvaluationRule } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'evaluationRule' as const // Modifique para sua tabela

export default class EvaluationRuleService extends BaseService<EvaluationRule> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getRulesFromCourse(courseId: string) {
    const { data, error } = await this.client
      .from(table)
      .select('*')
      .eq('courseId', courseId)
      .single()

    if (error) {
      errorHandler(error, 'Erro ao buscar regras de avaliação')
    }
    if (!data) {
      throw new Error('Nenhuma regra encontrada')
    }

    return data
  }
}
