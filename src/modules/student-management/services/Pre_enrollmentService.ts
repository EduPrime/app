import type { PreEnrollment } from '@prisma/client'
import BaseService from '@/services/BaseService'
import dayjs from 'dayjs'

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
      `) // Fazendo a seleção e o join com a tabela 'student'

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    return data
  }

  async getFilteredWithStudents(filter) {
    const { by, value, direction, serie } = filter || {}

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
  `)

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

    const { data, error } = await query

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    // Ordenação manual
    if (by && direction) {
      data.sort((a, b) => {
        const valueA = by === 'name' ? a.student.name : dayjs(a.student.birthdate).unix()
        const valueB = by === 'name' ? b.student.name : dayjs(b.student.birthdate).unix()
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

  async getSeries(filter) {
    const { by, value, direction, school } = filter || {}
    console.log(filter, school)
    const query = this.client.from('series').select(`
      *
  `).eq('schoolId', school)

    const { data, error } = await query

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }

    return data
  }

  async getClasses(seriesId: string) {
    let query = this.client.from('classroom').select(`
      *
  `)

    query = query.eq('seriesId', seriesId)

    const { data, error } = await query

    if (error) {
      throw new Error(`Erro ao buscar pré-matrículas com dados dos alunos: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error('Nenhuma pré-matrícula encontrada')
    }
    return data
  }
}
