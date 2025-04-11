import type { PreEnrollment } from '@prisma/client'
import BaseService from '@/services/BaseService'
// import dayjs from 'dayjs' // estava estourando o erro TS2307
import moment from 'moment'

export default class Pre_enrollmentService extends BaseService<PreEnrollment> {
  constructor() {
    super('preenrollment')
  }

  async getAllWithStudents() {
    const { data, error } = await this.client
      .from('preenrollment')
      .select(`
        *,
        student:studentId (name, address)
      `)
      .eq('situation', 'PENDENTE') // Fazendo a seleção e o join com a tabela 'student'

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    return data
  }

  async getFilteredWithStudents(filter: any) {
    const { by, value, direction, serie, school } = filter || {}

    if (by && !['name', 'age'].includes(by)) {
      throw new Error('Filtro inválido. Apenas "name" e "age" são permitidos.')
    }
    if (direction && !['asc', 'desc'].includes(direction)) {
      throw new Error('Ordenação inválida. Apenas "asc" e "desc" são permitidos.')
    }

    let query = this.client.from('preenrollment').select(`
      *
      ,
      student:studentId (*)
  `).eq('situation', 'PENDENTE').eq('schoolId', school)

    query = query.not('student', 'is', null)

    if (by && value) {
      if (by === 'name') {
        query = query.ilike('student.name', `%${value}%`)
      }
      else if (by === 'age') {
        query = query.eq('student.age', value)
      }
    }

    if (serie) {
      query = query.eq('seriesId', serie)
    }

    const { data, error } = await query as { data: any[], error: any }
    console.log('data do get', data)

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    // Ordenação manual
    if (by && direction) {
      data.sort((a, b) => {
        const valueA = by === 'name' ? a.student.name : moment(a.student.birthdate).unix()
        const valueB = by === 'name' ? b.student.name : moment(b.student.birthdate).unix()
        if (by === 'name') {
          if (direction === 'asc') {
            return valueA.localeCompare(valueB)
          }
          else {
            return valueB.localeCompare(valueA)
          }
        }
        else {
          if (direction === 'asc') {
            return valueB - valueA
          }
          else {
            return valueA - valueB
          }
        }
      })
    }

    return data
  }

  async getSeries(filter: any) {
    const { school } = filter || {}
    console.log(filter, school)
    const query = this.client.from('series').select(`
      *
  `).eq('schoolId', school)

    const { data, error } = await query as { data: any[], error: any }

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    return data
  }
}
