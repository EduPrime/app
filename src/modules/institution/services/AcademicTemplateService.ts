import BaseService from '@/services/BaseService'

const table = 'academic_year_template' as const

type AcademicTemplateTable = typeof table

export default class AcademicTemplateService extends BaseService<AcademicTemplateTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  /**
   * Calls the calculate_business_days function to calculate business days between two dates
   * @param startDate - Start date
   * @param endDate - End date
   * @returns The number of business days or null if there is an error
   */
  async getBusinessDays(startDate: string, endDate: string): Promise<number | null> {
    try {
      const result = await this.callRpc('calculate_business_days', { start_date: startDate, end_date: endDate })
      return result as number | null
    }
    catch (error) {
      console.error('Erro ao calcular dias úteis:', error)
      return null
    }
  }
}
