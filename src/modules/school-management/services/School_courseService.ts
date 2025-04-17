import BaseService from '@/services/BaseService'
import errorHandler from '@/utils/error-handler'

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
        errorHandler(error, 'Erro ao buscar cursos para a escola')
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
        errorHandler(courseError, 'Erro ao buscar detalhes dos cursos')
      }

      // Retorna os dados dos cursos
      return courses
    }
    catch (error) {
      errorHandler(error, 'Erro ao buscar cursos por escola')
    }
  }
}
