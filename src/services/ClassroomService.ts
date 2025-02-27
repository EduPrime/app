import type { Classroom } from '@prisma/client'
import BaseService from '@/services/BaseService'

const table = 'classroom' as const // Modifique para sua tabela

export default class ClassroomService extends BaseService<Classroom> {
  constructor() {
    super(table) // Passando o nome da tabela para a classe base
  }

  async getClassroom() {
    const { data, error } = await this.client
      .from(table)
      .select(`name, id, period, year, series:seriesId(id, name)`)
    // .eq('classroomId',classroomId)

    if (error) {
      throw new Error(`Erro ao trazer as turmas: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhuma turma encontrada')
    }

    return data
  }

  async listSchoolsAndClass(classes: string[]) {
    const { data, error } = await this.client
      .from('classroom')
      .select('id, name, school:schoolId (id, name), series:seriesId (name)')
      .in('id', classes)

    if (error) {
      throw new Error(`Erro ao buscar notas com dados dos alunos: ${error.message}`)
    }
    if (!data) {
      throw new Error('Nenhuma nota encontrada')
    }

    const schoolMap = new Map<string, { schoolId: string, schoolName: string, classes: { classId: string, className: string }[] }>()
    console.log('Retorno listSeries', data)

    data.forEach((item) => {
      const schoolId = item.school?.id
      const schoolName = item.school?.name
      const classId = item.id
      const className = item.name

      if (schoolId && schoolName && classId && className) {
        if (!schoolMap.has(schoolId)) {
          schoolMap.set(schoolId, { schoolId, schoolName, classes: [] })
        }

        const schoolEntry = schoolMap.get(schoolId)
        if (schoolEntry && !schoolEntry.classes.some(cls => cls.classId === classId)) {
          schoolEntry.classes.push({ classId, className })
        }
      }
    })
    return Array.from(schoolMap.values())
  }
}
