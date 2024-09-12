import BaseService from '@/services/BaseService'

const table = 'student' as const

type StudentTable = typeof table

export default class StudentService extends BaseService<StudentTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }
}
