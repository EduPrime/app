import type { Stage } from '@prisma/client'
import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

const table = 'stage' as const // Modifique para sua tabela

export default class StageService extends BaseService<Stage> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async isInsideStage(dates: string[], origin: string | undefined): Promise<{ date: string, inside: boolean }[]> {
    try {
      const { data: intervals, error } = await this.client
        .from(table)
        .select('startDate, endDate')

      if (error) {
        errorHandler(error, 'Erro ao buscar os intervalos de datas')
        return []
      }

      const parsedIntervals = intervals.map(interval => ({
        start: new Date(interval.startDate),
        end: new Date(interval.endDate),
      }))

      const result = dates.map((dateStr) => {
        const date = new Date(dateStr)
        const isInside = origin === 'frequency'
          ? parsedIntervals.some(interval =>
              date >= interval.start && date <= interval.end && date <= new Date())
          : parsedIntervals.some(interval =>
              date >= interval.start && date <= interval.end)

        return {
          date: date.toISOString().split('T')[0], // Formata como YYYY-MM-DD
          inside: isInside,
        }
      })

      return result
    }
    catch (error) {
      errorHandler(error, 'Não foi possível verificar se as datas estão dentro de uma etapa')
      return []
    }
  }
}
