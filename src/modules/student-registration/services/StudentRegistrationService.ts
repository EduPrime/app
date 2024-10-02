import BaseService from '@/services/BaseService'

 const table = 'institution' as const // Modifique para sua tabela

type StudentRegistrationServiceTable = typeof table

export default class StudentRegistrationService extends BaseService<StudentRegistrationServiceTable> {
  constructor() {
     super(table) // Passando o nome da tabela para a classe base
  }
}
