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

  async insertStudent(student: { [key: string]: any, tenantId?: string, createdAt?: string }) {
    try {
      student['tenantId'] = self.crypto.randomUUID();
      student['createdAt'] = new Date().toISOString();
      const data = await this.client
        .from('student')
        .insert([student])
        .select('id') // Seleciona o ID do novo registro

      console.log(data, 'Insert Student')

      return data
    }
    catch (error: unknown | any) {
      console.error(error)
      return error.status
    }
  }

  async getStudentId(student: { cpf?: any, birthCertificate?: any, rgNumber?: any }) {
    try {
      let query = this.client
        .from('student')
        .select('id')

      if (student.cpf) {
        query = query.eq('cpf', student.cpf)
      }
      else if (student.birthCertificate) {
        query = query.eq('birthCertificate', student.birthCertificate)
      }
      else if (student.rgNumber) {
        query = query.eq('rgNumber', student.rgNumber)
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
