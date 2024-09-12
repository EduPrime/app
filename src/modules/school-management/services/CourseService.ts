import BaseService from '@/services/BaseService'

const table = 'course' as const

type CourseTable = typeof table

export default class CourseService extends BaseService<CourseTable> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }



}
