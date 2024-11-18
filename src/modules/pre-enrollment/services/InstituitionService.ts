import BaseService from '@/services/BaseService'

const table = 'institution' as const // Modifique para sua tabela

type InstituitionServiceTable = typeof table

export default class InstituitionService extends BaseService<InstituitionServiceTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getInstituition() {
    try {
      const data = await this.client.from(table).select('*')
      return data
    }
    catch (error) {
      console.error('Erro ao listar a instituição:', error)
      throw error
    }
  }
}
