import BaseService from '@/services/BaseService'

const table = 'student' as const

type TabelaType = typeof table

export default class StudentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getStudents() {
    try {
      const { data, error } = await this.client
        .from('student')
        .select('*')

      if (error) {
        console.error(error)
        return void 0
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }

  async insertStudent(student: { name: any, birthdate: any, phone: any }) {
    try {
      const data = await this.client
        .from('student')
        .insert([student])
        .select('id') // Seleciona o ID do novo registro
      return data
    }
    catch (error: unknown | any) {
      console.error(error)
      return error.status
    }
  }

  async getStudentId(student: { cpf?: any, birth_certificate?: any, rg_number?: any }) {
    try {
      let query = this.client
        .from('student')
        .select('id')

      if (student.cpf) {
        query = query.eq('cpf', student.cpf)
      }
      else if (student.birth_certificate) {
        query = query.eq('birth_certificate', student.birth_certificate)
      }
      else if (student.rg_number) {
        query = query.eq('rg_number', student.rg_number)
      }
      else {
        throw new Error('Nenhum campo de identificação fornecido')
      }

      const { data, error } = await query

      if (error) {
        console.error(error)
        return (error as unknown | any).status
      }

      if (data && data.length > 0) {
        return data[0].id // Retorna o ID do aluno
      }

      return null
    }
    catch (error: unknown | any) {
      console.error(error)
      return error.status
    }
  }
}
