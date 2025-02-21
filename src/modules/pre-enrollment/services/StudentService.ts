import BaseService from '@/services/BaseService'
import { status } from '@prisma/client'
import { ref } from 'vue'

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

  async genericGet(collection: string, id: string) {
    try {
      const data = await this.client.from(collection).select('name').eq('id', id)
      return data.data?.at(0)
    }
    catch (error) {
      console.error('Erro ao buscar:', error)
      throw error
    }
  }
  async getStudentByResponsible(cpf: string) {
    try {
      const information = ref({
        preenrollmentcode: undefined as any,
        student: undefined as any,
        course: undefined as any,
        school: undefined as any,
        series: undefined as any,
        situation: undefined as any,
      })

      const { data } = await this.client
        .from('student')
        .select(`
          name,
          preenrollment:preenrollment(
            situation, 
            preenrollmentcode, 
            schoolId,
            courseId,
            seriesId
          )
        `)
        .or(`fatherCpf.eq.${cpf},motherCpf.eq.${cpf},guardianCpf.eq.${cpf}`);

      if (data && data.length > 0) {
        information.value.preenrollmentcode = data[0].preenrollment[0].preenrollmentcode
        information.value.student = data[0].name
        information.value.course = await this.genericGet('course', data[0].preenrollment[0].courseId)
        information.value.school = await this.genericGet('school', data[0].preenrollment[0].schoolId)
        information.value.series = await this.genericGet('series', data[0].preenrollment[0].seriesId)
        information.value.situation = data[0].preenrollment[0].situation
      }

      return information.value;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro inesperado: ${error.message}`);
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }
}
