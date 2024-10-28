import BaseService from '@/services/BaseService'

 const table = 'institution' as const // Modifique para sua tabela

type PreEnrollmentServiceTable = typeof table

export default class PreEnrollmentService extends BaseService<PreEnrollmentServiceTable> {
  constructor() {
     super(table) // Passando o nome da tabela para a classe base
  }
}
