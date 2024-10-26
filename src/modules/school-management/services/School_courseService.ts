import BaseService from '@/services/BaseService'

const table = 'school_course' as const

type TabelaType = typeof table

export default class School_courseService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para obter cursos baseados no ID da escola
  async getCoursesBySchool(schoolId: string) {
    try {
      // Consulta para obter os course_id baseados no school_id da tabela school_course
      const { data: schoolCourses, error } = await this.client
        .from('school_course') // Tabela de relacionamento
        .select('course_id') // Seleciona o course_id
        .eq('school_id', schoolId) // Filtra pelo school_id selecionado

      if (error) {
        throw error
      }

      // Se não encontrar nenhum curso relacionado, retornar vazio
      if (!schoolCourses || schoolCourses.length === 0) {
        return []
      }

      // Extrair os IDs dos cursos
      const courseIds = schoolCourses.map(sc => sc.course_id)

      // Buscar os detalhes dos cursos baseados nos course_ids extraídos
      const { data: courses, error: courseError } = await this.client
        .from('course') // Tabela de cursos
        .select('id, name') // Seleciona o ID e o nome dos cursos
        .in('id', courseIds) // Filtra pelos course_ids

      if (courseError) {
        throw courseError
      }

      // Retorna os dados dos cursos
      return courses
    }
    catch (error) {
      console.error('Erro ao buscar cursos para a escola:', error)
      throw new Error('Failed to fetch courses for the selected school.')
    }
  }
}
