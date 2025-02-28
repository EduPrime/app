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

    const schoolMap = new Map<string, { schoolId: string, schoolName: string, classes: { classroomId: string, classroomName: string }[] }>()

    data.forEach((item) => {
      const schoolId = item.school?.id
      const schoolName = item.school?.name
      const classroomId = item.id
      const classroomName = item.name

      if (schoolId && schoolName && classroomId && classroomName) {
        if (!schoolMap.has(schoolId)) {
          schoolMap.set(schoolId, { schoolId, schoolName, classes: [] })
        }

        const schoolEntry = schoolMap.get(schoolId)
        if (schoolEntry && !schoolEntry.classes.some(cls => cls.classroomId === classroomId)) {
          schoolEntry.classes.push({ classroomId, classroomName })
        }
      }
    })
    return Array.from(schoolMap.values())
  }
}
