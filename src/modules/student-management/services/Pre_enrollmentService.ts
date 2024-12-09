import BaseService from '@/services/BaseService'

const table = 'pre_enrollment' as const

type TabelaType = typeof table

export default class Pre_enrollmentService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  // Método para buscar pré-matrículas com dados do aluno
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
}
